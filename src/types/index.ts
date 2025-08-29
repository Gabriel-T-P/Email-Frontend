export interface EmailData {
  id: string;
  content: string;
  fileName?: string;
  uploadedAt: Date;
}

export interface ClassificationResult {
  category: 'produtivo' | 'improdutivo';
  confidence: number;
  suggestedResponse: string;
  processingTime: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface UploadResponse {
  fileId: string;
  fileName: string;
  size: number;
  type: string;
}