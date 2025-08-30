import type { ClassifyResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

// Classificar texto direto
export const classifyText = async (text: string): Promise<ClassifyResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/classify-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const data: ClassifyResponse = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || `Erro HTTP: ${response.status}`,
        response.status
      );
    }

    if (!data.success) {
      throw new ApiError(data.error || 'Erro desconhecido na classificação');
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Erro de rede ou parsing
    throw new ApiError(
      error instanceof Error ? error.message : 'Erro de conexão com o servidor'
    );
  }
};

// Classificar arquivo (.txt ou .pdf)
export const classifyFile = async (file: File): Promise<ClassifyResponse> => {
  try {
    // Validar tipo de arquivo
    const allowedTypes = ['text/plain', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      throw new ApiError('Tipo de arquivo não suportado. Use apenas .txt ou .pdf');
    }

    // Validar tamanho (ex: máximo 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new ApiError('Arquivo muito grande. Tamanho máximo: 10MB');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/classify-file`, {
      method: 'POST',
      body: formData, // Não definir Content-Type para FormData
    });

    const data: ClassifyResponse = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || `Erro HTTP: ${response.status}`,
        response.status
      );
    }

    if (!data.success) {
      throw new ApiError(data.error || 'Erro desconhecido na classificação');
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'Erro de conexão com o servidor'
    );
  }
};