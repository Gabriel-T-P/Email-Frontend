import type { ClassifyResponse } from '@/types';
import { formatClassificationResult } from '@/utils/classification';

interface ResultDisplayProps {
  result: ClassifyResponse['data'];
  onNewAnalysis: () => void;
  className: string;
}

export const ResultDisplay = ({ result, onNewAnalysis, className }: ResultDisplayProps) => {
  const formatted = formatClassificationResult(result);

  return (
    <div className={className}>
      <div className="message-form__header">
        <h2 className="message-form__title">Análise Completa</h2>
        <p className="message-form__description">
          &gt; Processamento neural finalizado_
        </p>
      </div>

      <div className="message-form__results">
        <div className="result-card">
          <div className="result-card__header">
            <h3 className="result-card__category">
              &gt; CATEGORIA: {formatted.categoryLabel.toUpperCase()}
            </h3>
            <div className="result-card__confidence">
              Confiança: {formatted.confidence}% ({formatted.confidenceLabel})
            </div>
          </div>

          <div className="result-card__content">
            <div className="result-card__response">
              <h4>&gt; Resposta:</h4>
              <p>{formatted.suggestedResponse}</p>
            </div>

            <div className="result-card__stats">
              <div className="stat">
                <span className="stat__label">&gt; Palavras:</span>
                <span className="stat__value">{formatted.wordCount}</span>
              </div>
              <div className="stat">
                <span className="stat__label">&gt; Tempo:</span>
                <span className="stat__value">{formatted.processingTime}</span>
              </div>
            </div>
          </div>

          <div className="result-card__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={onNewAnalysis}
            >
              &gt; Nova Análise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};