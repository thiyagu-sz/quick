import { jsPDF } from 'jspdf';

export interface PDFGeneratorOptions {
  title: string;
  content: string;
  author?: string;
  subject?: string;
}

/**
 * Client-side PDF generator for professional, branded documents
 * Uses jsPDF for pure JavaScript rendering in the browser
 */
export class ClientPDFGenerator {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number = 20;
  private contentWidth: number;
  private currentY: number;
  private lineHeight: number = 7;
  private defaultFontSize: number = 11;
  private brandColor: [number, number, number] = [94, 79, 255]; // QuickNotes purple
  private pageNumber: number = 1;

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });
    
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.contentWidth = this.pageWidth - (this.margin * 2);
    this.currentY = this.margin;
  }

  /**
   * Check if space is available, otherwise create new page
   */
  private checkPageBreak(requiredSpace: number = this.lineHeight): boolean {
    if (this.currentY + requiredSpace > this.pageHeight - this.margin - 15) {
      this.doc.addPage();
      this.pageNumber++;
      this.currentY = this.margin;
      this.addPageHeader();
      return true;
    }
    return false;
  }

  /**
   * Add subtle page header after first page
   */
  private addPageHeader(): void {
    if (this.pageNumber > 1) {
      this.doc.setDrawColor(200, 200, 210);
      this.doc.setLineWidth(0.3);
      this.doc.line(this.margin, this.currentY + 2, this.pageWidth - this.margin, this.currentY + 2);
      this.currentY += 6;
    }
  }

  /**
   * Add footer with page numbers and branding
   */
  private addPageFooters(): void {
    const totalPages = this.doc.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      this.doc.setPage(i);

      // Page number
      this.doc.setFontSize(9);
      this.doc.setTextColor(140, 140, 150);
      this.doc.text(
        `Page ${i} of ${totalPages}`,
        this.pageWidth / 2,
        this.pageHeight - 10,
        { align: 'center' }
      );

      // Footer text
      this.doc.setFontSize(8);
      this.doc.text(
        '© Generated using QuickNotes — AI Study Assistant | www.quicknotess.space',
        this.pageWidth / 2,
        this.pageHeight - 5,
        { align: 'center' }
      );

      this.doc.setTextColor(0, 0, 0);
    }
  }

  /**
   * Add wrapped text with proper formatting
   */
  private addWrappedText(
    text: string,
    fontSize: number = this.defaultFontSize,
    isBold: boolean = false,
    color: [number, number, number] = [26, 26, 26]
  ): void {
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    this.doc.setTextColor(...color);
    
    const lines = this.doc.splitTextToSize(text, this.contentWidth);
    for (const line of lines) {
      this.checkPageBreak();
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += this.lineHeight;
    }
  }

  /**
   * Add professional cover page
   */
  private addCoverPage(title: string): void {
    // Background color
    this.doc.setFillColor(245, 247, 250);
    this.doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');

    this.currentY = this.margin + 40;

    // Logo/branding
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...this.brandColor);
    this.doc.text('📚 QuickNotes', this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 8;

    // Tagline
    this.doc.setFontSize(10);
    this.doc.setTextColor(120, 120, 130);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('AI-Powered Study Assistant', this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 30;

    // Title
    this.doc.setFontSize(28);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(26, 26, 26);
    
    const titleLines = this.doc.splitTextToSize(title, this.contentWidth - 20);
    titleLines.forEach((line: string) => {
      this.doc.text(line, this.pageWidth / 2, this.currentY, { align: 'center' });
      this.currentY += 12;
    });

    this.currentY += 20;

    // Date
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    this.doc.setFontSize(11);
    this.doc.setTextColor(100, 100, 110);
    this.doc.text(`Generated: ${today}`, this.pageWidth / 2, this.currentY, { align: 'center' });

    // Decorative line
    this.currentY += 20;
    this.doc.setDrawColor(...this.brandColor);
    this.doc.setLineWidth(1);
    this.doc.line(this.pageWidth / 2 - 40, this.currentY, this.pageWidth / 2 + 40, this.currentY);

    // Add page break
    this.doc.addPage();
    this.pageNumber++;
    this.currentY = this.margin;
  }

  /**
   * Parse markdown content and render to PDF
   */
  private parseMarkdownContent(content: string): void {
    const lines = content.split('\n');
    let inList = false;
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();

      // Handle empty lines
      if (!trimmed) {
        if (inList) {
          this.currentY += 3;
          inList = false;
        }
        this.currentY += 4;
        continue;
      }

      // Handle code blocks
      if (trimmed.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockContent = [];
        } else {
          inCodeBlock = false;
          this.renderCodeBlock(codeBlockContent);
          codeBlockContent = [];
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Handle headings
      if (trimmed.startsWith('# ')) {
        this.ensureHeadingSpace(25);
        this.currentY += 5;
        this.addWrappedText(trimmed.slice(2), 20, true, this.brandColor);
        this.currentY += 8;
        continue;
      }

      if (trimmed.startsWith('## ')) {
        this.ensureHeadingSpace(20);
        this.currentY += 3;
        this.addWrappedText(trimmed.slice(3), 16, true);
        // Underline
        this.doc.setDrawColor(...this.brandColor);
        this.doc.setLineWidth(0.5);
        this.doc.line(this.margin, this.currentY + 2, this.pageWidth - this.margin, this.currentY + 2);
        this.currentY += 8;
        continue;
      }

      if (trimmed.startsWith('### ')) {
        this.ensureHeadingSpace(15);
        this.currentY += 2;
        this.addWrappedText(trimmed.slice(4), 13, true, [50, 50, 60]);
        this.currentY += 4;
        continue;
      }

      // Handle MCQ format
      if (trimmed.match(/^Q\d+\./)) {
        this.ensureHeadingSpace(18);
        this.currentY += 3;
        this.addWrappedText(trimmed, 12, true);
        this.currentY += 3;
        continue;
      }

      if (trimmed.match(/^[A-D]\./) && !trimmed.startsWith('A]')) {
        this.checkPageBreak(this.lineHeight + 2);
        this.addWrappedText(`  ${trimmed}`, 11, false, [50, 50, 60]);
        this.currentY += 2;
        continue;
      }

      if (trimmed.startsWith('Correct Answer:')) {
        this.checkPageBreak(this.lineHeight + 4);
        this.doc.setFillColor(220, 252, 231);
        this.doc.rect(this.margin, this.currentY - 2, this.contentWidth, this.lineHeight + 4, 'F');
        this.addWrappedText(trimmed, 11, true, [22, 163, 74]);
        this.currentY += 3;
        continue;
      }

      if (trimmed.startsWith('Explanation:')) {
        this.checkPageBreak(this.lineHeight + 2);
        this.addWrappedText(trimmed, 10, false, [100, 100, 110]);
        this.currentY += 3;
        continue;
      }

      // Handle lists
      if (trimmed.match(/^[-•*]\s/)) {
        this.checkPageBreak(this.lineHeight + 2);
        if (!inList) {
          inList = true;
          this.currentY += 2;
        }
        const listText = trimmed.replace(/^[-•*]\s/, '');
        this.addWrappedText(`• ${listText}`, 11, false, [50, 50, 60]);
        this.currentY += 2;
        continue;
      }

      if (trimmed.startsWith('> ')) {
        this.ensureHeadingSpace(15);
        this.currentY += 2;
        this.doc.setFillColor(245, 243, 255);
        this.doc.rect(this.margin, this.currentY - 2, this.contentWidth, this.lineHeight + 4, 'F');
        this.doc.setDrawColor(...this.brandColor);
        this.doc.setLineWidth(1);
        this.doc.line(this.margin, this.currentY - 2, this.margin, this.currentY + this.lineHeight + 2);
        this.addWrappedText(`  ${trimmed.slice(2)}`, 10, false, [75, 85, 99]);
        this.currentY += 3;
        continue;
      }

      // Regular paragraph
      if (inList) {
        inList = false;
        this.currentY += 3;
      }

      this.checkPageBreak(this.lineHeight + 2);
      let displayText = trimmed;
      const isBold = trimmed.includes('**');
      if (isBold) {
        displayText = trimmed.replace(/\*\*(.*?)\*\*/g, '$1');
      }
      this.addWrappedText(displayText, this.defaultFontSize, isBold, [50, 50, 60]);
      this.currentY += 3;
    }
  }

  /**
   * Ensure space for heading, accounting for styling
   */
  private ensureHeadingSpace(space: number): void {
    if (this.currentY + space > this.pageHeight - this.margin - 15) {
      this.doc.addPage();
      this.pageNumber++;
      this.currentY = this.margin;
      this.addPageHeader();
    }
  }

  /**
   * Render code block with styling
   */
  private renderCodeBlock(lines: string[]): void {
    if (lines.length === 0) return;
    
    this.ensureHeadingSpace(lines.length * this.lineHeight + 10);
    this.currentY += 3;

    this.doc.setFillColor(240, 240, 245);
    this.doc.rect(this.margin, this.currentY - 3, this.contentWidth, lines.length * this.lineHeight + 6, 'F');

    this.doc.setFont('courier', 'normal');
    this.doc.setFontSize(9);
    this.doc.setTextColor(50, 50, 60);

    lines.forEach((line) => {
      this.doc.text(line.substring(0, 90), this.margin + 3, this.currentY + 2);
      this.currentY += this.lineHeight;
    });

    this.doc.setFont('helvetica', 'normal');
    this.currentY += 5;
  }

  /**
   * Generate PDF and return as blob
   */
  public generate(options: PDFGeneratorOptions): Blob {
    // Add cover page
    this.addCoverPage(options.title);

    // Parse and add content
    this.parseMarkdownContent(options.content);

    // Add footers to all pages
    this.addPageFooters();

    // Return PDF as blob
    return this.doc.output('blob');
  }
}

// Helper function for easy use
export function generateClientPDF(options: PDFGeneratorOptions): Blob {
  const generator = new ClientPDFGenerator();
  return generator.generate(options);
}