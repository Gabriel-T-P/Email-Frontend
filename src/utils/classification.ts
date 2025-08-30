import type { ClassifyResponse } from '@/types';

// Helper para formatar resultados de classificação
export const formatClassificationResult = (data: ClassifyResponse['data']) => {
  const { classification, analysis, response } = data;

  return {
    category: classification.category,
    categoryLabel: classification.category === 'produtivo' ? 'Produtivo' : 'Improdutivo',
    confidence: Math.round(classification.confidence * 100), // Converter para %
    confidenceLabel: getConfidenceLabel(classification.confidence),
    processingTime: `${analysis.processingTime}ms`,
    wordCount: analysis.wordCount,
    suggestedResponse: response,
  };
};

// Helper para determinar label de confiança
export const getConfidenceLabel = (confidence: number): string => {
  if (confidence >= 0.8) return 'Alta';
  if (confidence >= 0.6) return 'Média';
  return 'Baixa';
};

// Helper para cor baseada na categoria (para UI)
export const getCategoryColor = (category: 'produtivo' | 'improdutivo'): string => {
  return category === 'produtivo' ? '#00FF41' : '#39FF14'; // Verde matrix diferenciado
};

// Helper para ícone baseado na categoria
export const getCategoryIcon = (category: 'produtivo' | 'improdutivo'): string => {
  return category === 'produtivo' ? '⚡' : '📝';
};

// Helper para texto de status no estilo terminal
export const getTerminalStatusText = (
  category: 'produtivo' | 'improdutivo',
  confidence: number
): string => {
  const confidencePercent = Math.round(confidence * 100);
  return `> STATUS: ${category.toUpperCase()} | CONF: ${confidencePercent}% | NEURAL: ATIVO`;
};

// Helper para validar conteúdo antes de enviar
export const validateMessageContent = (content: string): string | null => {
  const trimmed = content.trim();

  if (!trimmed) {
    return 'ERRO: Conteúdo vazio detectado';
  }

  if (trimmed.length < 10) {
    return 'ERRO: Mensagem muito curta (mín: 10 caracteres)';
  }

  if (trimmed.length > 5000) {
    return 'ERRO: Mensagem muito longa (máx: 5000 caracteres)';
  }

  return null; // Sem erros
};

// Helper para validar arquivo
export const validateFile = (file: File): string | null => {
  const allowedTypes = ['text/plain', 'application/pdf'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return 'ERRO: Tipo não suportado. Use .txt ou .pdf';
  }

  if (file.size > maxSize) {
    return 'ERRO: Arquivo muito grande (máx: 10MB)';
  }

  if (file.size === 0) {
    return 'ERRO: Arquivo vazio detectado';
  }

  return null; // Sem erros
};