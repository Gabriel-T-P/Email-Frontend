export interface MessageData {
  id: string;
  content: string;
  createdAt: Date;
}

export interface ClassificationResult {
  category: 'produtivo' | 'improdutivo';
  confidence: number;
  suggestedResponse: string;
  processingTime: number;
  analyzedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface FormState {
  message: string;
  isLoading: boolean;
  error: string | null;
  result: ClassificationResult | null;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';