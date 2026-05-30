import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';
import { AiService } from '@/app/lib/ai/aiService';
import { CONFIG } from '@/app/lib/config';
import { ErrorHandler, AppError } from '@/app/lib/errors/errorHandler';
import { requireAuth } from '@/app/lib/auth/requireAuth';

// Queue is lazy-loaded so the upload route still works when REDIS_URL is absent.
// If Redis is available, embedding is offloaded to the background worker.
// If Redis is absent, embedding runs synchronously in this request (original behavior).
let uploadQueuePromise: Promise<import('@/worker/queues').uploadQueue['constructor']['prototype'] | null> | null = null;

async function getUploadQueue() {
  if (!process.env.REDIS_URL) return null;
  if (!uploadQueuePromise) {
    uploadQueuePromise = import('@/worker/queues')
      .then(m => m.uploadQueue)
      .catch(() => null);
  }
  return uploadQueuePromise;
}

export const maxDuration = 60;
export const runtime = "nodejs";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// 45s cap on PDF parsing — leaves ~15s for embedding before Vercel's 60s maxDuration
const PDF_PARSE_TIMEOUT_MS = 45000;

// Race a promise against a timeout so corrupted PDFs don't hang the serverless slot
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let id: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    id = setTimeout(() => reject(new Error(`${label} timed out after ${ms / 1000}s`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(id));
}

interface Chunk {
  content: string;
  start: number;
  end: number;
}

function chunkText(text: string, chunkSize: number = 1000, overlap: number = 200): Chunk[] {
  const chunks: Chunk[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push({
      content: text.substring(start, end),
      start,
      end,
    });
    start = end - overlap;
  }

  return chunks;
}

async function extractTextFromFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  console.log(`Extracting text from file: ${file.name}, type: ${fileType}`);

  try {
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      // Try multiple methods to load pdfjs-dist
      try {
        let pdfjs: any = null;
        
        // Method 1: Try dynamic import with main module
        try {
          const pdfjsModule = await import('pdfjs-dist');
          pdfjs = (pdfjsModule as any).default || pdfjsModule;
          if (pdfjs && pdfjs.getDocument) {
            console.log('Loaded pdfjs-dist via main import');
          }
        } catch (importError) {
          console.log('Main import failed, trying legacy build...');
        }
        
        // Method 2: Try legacy build with dynamic import
        if (!pdfjs || !pdfjs.getDocument) {
          try {
            const legacyModule = await import('pdfjs-dist/legacy/build/pdf.mjs');
            pdfjs = (legacyModule as any).default || legacyModule;
            if (pdfjs && pdfjs.getDocument) {
              console.log('Loaded pdfjs-dist via legacy .mjs');
            }
          } catch (mjsError) {
            console.log('Legacy .mjs import failed, trying .js...');
          }
        }
        
        // Method 3: Try require with createRequire (for CommonJS)
        if (!pdfjs || !pdfjs.getDocument) {
          try {
            const { createRequire } = await import('module');
            const require = createRequire(import.meta.url);
            // Try different paths
            const paths = [
              'pdfjs-dist/legacy/build/pdf.js',
              'pdfjs-dist/build/pdf.js',
              'pdfjs-dist',
            ];
            
            for (const path of paths) {
              try {
                pdfjs = require(path);
                if (pdfjs && pdfjs.getDocument) {
                  console.log(`Loaded pdfjs-dist via require: ${path}`);
                  break;
                }
              } catch (reqError) {
                // Try next path
                continue;
              }
            }
          } catch (requireError) {
            console.log('Require method failed');
          }
        }
        
        if (!pdfjs || !pdfjs.getDocument) {
          throw new Error('Could not load pdfjs-dist. Tried multiple import methods.');
        }
        
        // Load the PDF document
        const loadingTask = pdfjs.getDocument({
          data: new Uint8Array(buffer),
          useSystemFonts: true,
          verbosity: 0, // Suppress warnings
        });
        
        const pdfDocument = await withTimeout(loadingTask.promise, PDF_PARSE_TIMEOUT_MS, 'pdfjs');
        const numPages = pdfDocument.numPages;
        
        console.log(`PDF loaded: ${numPages} pages`);
        
        // Extract text from all pages
        let fullText = '';
        
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdfDocument.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          // Combine all text items from the page
          const pageText = textContent.items
            .map((item: any) => item.str || '')
            .join(' ');
          
          fullText += pageText + '\n\n';
        }
        
        if (!fullText || fullText.trim().length === 0) {
          throw new Error('PDF appears to be empty or contains no extractable text');
        }
        
        console.log(`Extracted ${fullText.length} characters from PDF`);
        return fullText.trim();
      } catch (parseError) {
        console.error('Error parsing PDF with pdfjs-dist:', parseError);
        
        // Fallback 1: Try pdf2json (simpler, more reliable)
        try {
          console.log('Attempting fallback with pdf2json...');
          const { createRequire } = await import('module');
          const require = createRequire(import.meta.url);
          const PDFParser = require('pdf2json');
          
          return await withTimeout(
            new Promise<string>((resolve, reject) => {
              const pdfParser = new PDFParser(null, 1);

              pdfParser.on('pdfParser_dataError', (errData: any) => {
                console.error('pdf2json parse error:', errData);
                reject(new Error(`PDF parsing error: ${errData.parserError}`));
              });

              pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
                try {
                  // Extract text from all pages
                  let fullText = '';
                  if (pdfData.Pages && pdfData.Pages.length > 0) {
                    for (const page of pdfData.Pages) {
                      if (page.Texts && page.Texts.length > 0) {
                        for (const textItem of page.Texts) {
                          if (textItem.R && textItem.R.length > 0) {
                            for (const run of textItem.R) {
                              if (run.T) {
                                try {
                                  fullText += decodeURIComponent(run.T) + ' ';
                                } catch {
                                  fullText += run.T + ' ';
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }

                  if (!fullText || fullText.trim().length === 0) {
                    reject(new Error('PDF appears to be empty or contains no extractable text'));
                  } else {
                    console.log(`Extracted ${fullText.length} characters using pdf2json`);
                    resolve(fullText.trim());
                  }
                } catch (extractError) {
                  reject(extractError);
                }
              });

              // Parse the buffer
              pdfParser.parseBuffer(Buffer.from(buffer));
            }),
            PDF_PARSE_TIMEOUT_MS,
            'pdf2json'
          );
        } catch (pdf2jsonError) {
          console.error('pdf2json also failed:', pdf2jsonError);
          
          // Fallback 2: Try pdf-parse as last resort
          try {
            console.log('Attempting final fallback with pdf-parse...');
            const { createRequire } = await import('module');
            const require = createRequire(import.meta.url);
            const pdfParseLib = require('pdf-parse');
            
            // Try to use PDFParse class if available
            if (pdfParseLib.PDFParse && typeof pdfParseLib.PDFParse === 'function') {
              // PDFParse is a class - we need to check if it can be called or needs instantiation
              // Some versions export it as a callable class
              try {
                const result = await withTimeout(
                  new Promise((resolve, reject) => {
                    // Try calling as constructor with callback
                    const parser = new pdfParseLib.PDFParse(Buffer.from(buffer), (err: any, data: any) => {
                      if (err) reject(err);
                      else resolve(data);
                    });

                    // If no callback pattern, try direct instantiation
                    if (!parser || typeof parser !== 'object') {
                      try {
                        const directResult = new pdfParseLib.PDFParse(Buffer.from(buffer));
                        if (directResult && directResult.text) {
                          resolve(directResult);
                        } else {
                          setTimeout(() => {
                            if (directResult && directResult.text) {
                              resolve(directResult);
                            } else {
                              reject(new Error('PDFParse did not return text'));
                            }
                          }, 100);
                        }
                      } catch (syncError) {
                        reject(syncError);
                      }
                    }
                  }),
                  PDF_PARSE_TIMEOUT_MS,
                  'pdf-parse-class'
                );
                
                const text = (result as any)?.text || '';
                if (text && text.trim().length > 0) {
                  return text;
                }
              } catch (classError) {
                console.error('PDFParse class instantiation failed:', classError);
              }
            }
            
            // Last resort: try default export
            const pdfParseFn = pdfParseLib.default || pdfParseLib;
            if (typeof pdfParseFn === 'function') {
              const data = await withTimeout(
                pdfParseFn(Buffer.from(buffer)),
                PDF_PARSE_TIMEOUT_MS,
                'pdf-parse-fn'
              );
              const text = data?.text || '';
              if (text && text.trim().length > 0) {
                return text;
              }
            }
          } catch (fallbackError) {
            console.error('Fallback pdf-parse also failed:', fallbackError);
          }
          
          throw new Error(`Failed to parse PDF: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
        }
      }
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
      const text = result.value || '';
      if (text.trim().length === 0) {
        throw new Error('DOCX file appears to be empty or contains no extractable text');
      }
      return text;
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      fileType === 'application/vnd.ms-powerpoint' ||
      fileName.endsWith('.pptx') ||
      fileName.endsWith('.ppt')
    ) {
      // For PPTX/PPT, return a basic placeholder - full extraction would require additional libraries
      return `[PowerPoint file: ${file.name}]\n\nNote: Full text extraction from PowerPoint files requires additional processing. The file has been uploaded but detailed text extraction is not available for this format.`;
    } else if (fileName.endsWith('.doc')) {
      // Old DOC format - not fully supported
      return `[Word Document: ${file.name}]\n\nNote: Old .doc format is not fully supported. Please convert to .docx for better text extraction.`;
    } else if (fileName.endsWith('.txt')) {
      // Plain text file
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(buffer);
    }

    throw new Error(`Unsupported file type: ${fileType || 'unknown'}. Supported: PDF, DOCX, PPTX, TXT`);
  } catch (error) {
    console.error(`Error in extractTextFromFile for ${file.name}:`, error);
    throw error;
  }
}

type FormatType = 'key-points' | 'main-concepts' | 'exam-points' | 'short-notes' | 'speech-notes' | 'presentation-notes' | 'summary' | 'mcqs' | 'quick-test';

function generateFormatPrompt(format: FormatType, wordCount: number): { systemPrompt: string; userPromptPrefix: string } {
  const formatPrompts: Record<FormatType, { systemPrompt: string; userPromptPrefix: string }> = {
    'key-points': {
      systemPrompt: `You are an expert study assistant. Extract and organize KEY POINTS from study materials.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for bullet points)
- Focus ONLY on the most important information
- Use clear headings (##) to organize sections
- Use bullet points (-) for key points
- Use **bold** for important terms
- Keep paragraphs short (max 2-3 sentences)
- Limit to EXACTLY ${wordCount} words
- Structure: Main Topic → Key Points → Important Details
- Make it exam-friendly and readable`,
      userPromptPrefix: 'Extract and organize KEY POINTS from this study material. Focus on the most important information only:'
    },
    'main-concepts': {
      systemPrompt: `You are an expert study assistant. Identify and explain the MAIN CONCEPTS from study materials.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for lists)
- Provide clear definitions and explanations
- Use headings (##) for each main concept
- Use bullet points for supporting details
- Use **bold** for key terms and definitions
- Keep it structured and organized
- Limit to EXACTLY ${wordCount} words
- Make content clear and exam-friendly`,
      userPromptPrefix: 'Identify and explain the MAIN CONCEPTS from this study material:'
    },
    'exam-points': {
      systemPrompt: `You are an expert study assistant. Create EXAM-FOCUSED NOTES from study materials.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for bullet points)
- Highlight information likely to appear in exams
- Include definitions, formulas, dates, names, and key facts
- Use headings (##) to organize by topic
- Use bullet points for key facts
- Use **bold** for important terms
- Keep paragraphs very short
- Limit to EXACTLY ${wordCount} words
- Structure for quick review and memorization`,
      userPromptPrefix: 'Create EXAM-FOCUSED NOTES from this study material:'
    },
    'short-notes': {
      systemPrompt: `You are an expert study assistant. Create SHORT NOTES from study materials.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for bullet points)
- Keep it concise and organized
- Use clear headings (##) for sections
- Use bullet points for key information
- Focus on essential information only
- Limit to EXACTLY ${wordCount} words
- Make it easy to scan and review`,
      userPromptPrefix: 'Create SHORT NOTES from this study material:'
    },
    'speech-notes': {
      systemPrompt: `You are an expert study assistant. Create SPEECH NOTES from study materials.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for bullet points)
- Structure for verbal presentation
- Use headings (##) for main sections
- Use bullet points for talking points
- Keep it conversational and easy to follow
- Use **bold** for emphasis points
- Limit to EXACTLY ${wordCount} words
- Make it suitable for speaking`,
      userPromptPrefix: 'Create SPEECH NOTES from this study material:'
    },
    'presentation-notes': {
      systemPrompt: `You are an expert study assistant. Create PRESENTATION NOTES from study materials.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for bullet points)
- Structure for slide-by-slide presentation
- Use headings (##) for each slide topic
- Use bullet points for slide content
- Keep points concise and visual
- Use **bold** for emphasis
- Limit to EXACTLY ${wordCount} words
- Make it suitable for presenting`,
      userPromptPrefix: 'Create PRESENTATION NOTES from this study material:'
    },
    'summary': {
      systemPrompt: `You are an expert study assistant. Create a comprehensive SUMMARY from study materials.

REQUIREMENTS:
- Use markdown formatting (# for headings, - for bullet points)
- Provide a comprehensive overview
- Use clear headings (##) for major sections
- Use bullet points for key information
- Balance detail with conciseness
- Use **bold** for important concepts
- Limit to EXACTLY ${wordCount} words
- Make it complete yet readable`,
      userPromptPrefix: 'Create a comprehensive SUMMARY from this study material:'
    },
    'mcqs': {
      systemPrompt: `You are an expert exam preparation assistant.

Your task is to generate Multiple Choice Questions (MCQs) strictly based on the provided study material.

RULES:
- Do NOT introduce information outside the given content
- Questions must be exam-oriented and concept-focused
- Difficulty level: Medium (college / university exams)
- Avoid ambiguous or opinion-based questions
- IF including tables: use clean markdown format ONLY

FORMAT REQUIREMENTS:
- Each question must have exactly 4 options (A–D)
- Use clean, vertical layout (one option per line)
- Clearly mark the correct answer
- Provide a brief explanation

STRUCTURE:
## Multiple Choice Questions (MCQs)

Q1. Question text here?
A. Option A
B. Option B
C. Option C
D. Option D

Correct Answer: A
Explanation: Brief explanation of why this is correct.

---

Q2. Next question?
A. Option A
B. Option B
C. Option C
D. Option D

Correct Answer: B
Explanation: Brief explanation here.

IF YOU NEED TO INCLUDE A COMPARISON TABLE:

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data | Data | Data |
| Data | Data | Data |

IMPORTANT TABLE RULES:
- Use pipes (|) and dashes (-) ONLY for table structure
- Clean rows with equal spacing
- NO extra symbols, colons, or dashes outside table
- NO messy alignment characters

DO NOT USE THESE FORMATS:
✗ Messy alignment: | :--- | :--- | :--- |
✗ Extra pipes: ||| Data ||| More Data |||
✗ Unequal spacing between rows
✗ Extra colons or dashes: |: Data :| or |--- Data ---|
✗ Box-drawing characters: ╔║╚╝╠╣╦╩

CONSTRAINTS:
- Generate exactly ${wordCount} MCQs
- Do not repeat questions
- Keep explanations concise
- Use Q1, Q2, Q3... numbering
- Use A. B. C. D. format for options
- CLEAN formatting: no extra characters or symbols`,
      userPromptPrefix: 'Generate exam-focused MCQs from this study material:'
    },
    'quick-test': {
      systemPrompt: 'Quick Test mode - handled separately',
      userPromptPrefix: 'Quick Test mode - handled separately'
    },
  };

  return formatPrompts[format] || formatPrompts['key-points'];
}

async function generateAINotes(text: string, outputType: FormatType = 'key-points', wordCount: number = 100): Promise<string> {
  try {
    const textToProcess = text.length > 8000 ? text.substring(0, 8000) + '\n\n[Content truncated for processing...]' : text;
    const { systemPrompt, userPromptPrefix } = generateFormatPrompt(outputType, wordCount);
    
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `${userPromptPrefix}\n\n${textToProcess}` }
    ];

    const generatedNotes = await AiService.complete(messages, {
      temperature: 0.3,
      maxTokens: 2000,
    });

    if (!generatedNotes || generatedNotes.trim().length === 0) {
      return `# Key Study Notes\n\n## Important Points\n\n${text.substring(0, 1500)}...`;
    }
    
    return generatedNotes;
  } catch (error) {
    console.error('Error generating AI notes:', error);
    return `# Key Study Notes\n\n## Summary\n\n${text.substring(0, 1500)}...\n\n*Note: AI processing error. Showing text summary.*`;
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authentication
    const { user, supabase } = await requireAuth(request);
    if (!supabase) {
      throw new AppError('Failed to initialize database client', 500, 'CONFIG_ERROR');
    }

    const formData = await request.formData();
    const collectionName = formData.get('collectionName') as string;
    const files = formData.getAll('files') as File[];
    const outputType = (formData.get('outputType') as FormatType) || 'key-points';
    const rawWordCount = parseInt(formData.get('wordCount') as string) || 100;
    const wordCount = Math.min(Math.max(rawWordCount, 50), 500);

    if (!collectionName || !collectionName.trim()) {
      return NextResponse.json({ error: 'Collection name is required' }, { status: 400 });
    }

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    if (files.length > 10) {
      return NextResponse.json({ error: 'Maximum 10 files allowed' }, { status: 400 });
    }

    // Validate all files
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` },
          { status: 400 }
        );
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `File ${file.name} is not a supported format. Please upload PDF, PPT, PPTX, or DOCX files.` },
          { status: 400 }
        );
      }
    }

    // Create collection
    const { data: collectionData, error: collectionError } = await supabase
      .from('collections')
      .insert({
        user_id: user.id,
        name: collectionName.trim(),
      })
      .select()
      .single();

    if (collectionError) {
      console.error('Collection creation error:', collectionError);
      return NextResponse.json(
        { error: 'Failed to create collection' },
        { status: 500 }
      );
    }

    // Process all files
    const uploadedDocuments: any[] = [];
    const extractionErrors: string[] = [];

    for (const file of files) {
      try {
        console.log(`📄 Processing file: ${file.name} (${file.type}, ${file.size} bytes)`);
        
        // Extract text from file
        let extractedText: string;
        try {
          extractedText = await extractTextFromFile(file);
          console.log(`✅ Extracted ${extractedText.length} characters from ${file.name}`);
        } catch (extractError) {
          const errorMsg = extractError instanceof Error ? extractError.message : String(extractError);
          console.error(`❌ Error extracting text from ${file.name}:`, errorMsg);
          extractionErrors.push(`${file.name}: ${errorMsg}`);
          continue;
        }

        if (!extractedText || extractedText.trim().length === 0) {
          console.warn(`⚠️ No text extracted from ${file.name}, skipping...`);
          extractionErrors.push(`${file.name}: File appears to be empty or contains no extractable text`);
          continue;
        }

        // Save file directly to document_collections with status pending
        const { data: documentData, error: documentError } = await supabase
          .from('document_collections')
          .insert({
            collection_id: collectionData.id,
            user_id: user.id,
            file_name: file.name,
            file_type: file.type,
            file_size: file.size,
            content: extractedText,
            status: 'pending',
          })
          .select()
          .single();

        if (documentError) {
          console.error(`❌ Document collection insert error for ${file.name}:`, documentError);
        } else {
          uploadedDocuments.push({
            id: documentData.id,
            name: documentData.file_name,
            status: 'pending',
          });

          // Embedding: enqueue to background worker if Redis is available,
          // otherwise fall back to inline processing (original behaviour).
          try {
            const queue = await getUploadQueue();

            if (queue) {
              // Background path — upload route returns immediately; worker handles embeddings
              await queue.add('embed-document', {
                documentId: documentData.id,
                collectionId: collectionData.id,
                userId: user.id,
                storagePath: '',
                fileName: file.name,
                fileType: file.type,
                outputType: 'key-points',
                wordCount: 100,
              });
              console.log(`📬 Queued embedding job for ${file.name}`);
            } else {
              // Synchronous fallback — no Redis configured
              console.log(`🔄 Generating embeddings inline for ${file.name}...`);
              const chunks = chunkText(extractedText, 1000, 200);
              const BATCH_SIZE = 10;

              for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
                const batch = chunks.slice(i, i + BATCH_SIZE);
                const embeddings = await Promise.all(
                  batch.map(c => AiService.generateEmbedding(c.content))
                );
                const records = batch.map((chunk, idx) => ({
                  collection_id: collectionData.id,
                  document_id: documentData.id,
                  user_id: user.id,
                  content: chunk.content,
                  chunk_index: i + idx,
                  embedding: embeddings[idx],
                }));
                const { error: insertError } = await supabase
                  .from('document_chunks')
                  .insert(records);
                if (insertError) {
                  console.error(`❌ Failed to insert chunks for ${file.name}:`, insertError);
                }
              }
              console.log(`✅ Inline embeddings done for ${file.name}`);
            }
          } catch (embeddingError) {
            console.error(`⚠️ Embedding error for ${file.name}:`, embeddingError);
          }
        }
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
      }
    }

    // Return immediately after creating records and storing text
    return NextResponse.json({
      success: true,
      collectionId: collectionData.id,
      status: "processing",
      message: "Your documents are being processed. Notes will appear shortly.",
      documents: uploadedDocuments
    }, { status: 202 });

  } catch (error) {
    console.error('Upload route error:', error);
    return ErrorHandler.handle(error, 'POST /api/upload');
  }
}

