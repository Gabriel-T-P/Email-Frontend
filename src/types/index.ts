export interface ClassifyResponse {
  success: boolean;
  data: {
    classification: {
      category: 'produtivo' | 'improdutivo';
      confidence: number;          // 0.0 a 1.0
    };
    analysis: {
      processingTime: number;      // ms gastos
      wordCount: number;
    };
    response: string;              // Resposta sugerida
  };
  error?: string;
}

export interface MessageData {
  id: string;
  content: string;
  createdAt: Date;
}

export interface FormState {
  message: string;
  file: File | null;
  isLoading: boolean;
  error: string | null;
  result: ClassifyResponse['data'] | null;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export type InputType = 'text' | 'file';