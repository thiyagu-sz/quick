import { Queue } from 'bullmq';
import IORedis from 'ioredis';

export const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  tls: process.env.REDIS_URL?.startsWith('rediss://') ? {} : undefined,
});

export const uploadQueue = new Queue('upload-processing', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: 100,
    removeOnFail: 500,
  },
});

export interface UploadJobData {
  documentId: string;
  collectionId: string;
  userId: string;
  storagePath: string;
  fileName: string;
  fileType: string;
  outputType: string;
  wordCount: number;
}
