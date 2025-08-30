import { useState } from 'react';
import type { FormState, FormStatus, ClassifyResponse } from '@/types';
import { classifyText } from '@/services/api';
import { formatClassificationResult, validateMessageContent } from '@/utils/classification';

export const MessageForm = () => {
  const [formState, setFormState] = useState<FormState>({
    message: '',
    file: null,
    isLoading: false,
    error: null,
    result: null
  });

  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Usar validação da utils
    const validationError = validateMessageContent(formState.message);
    if (validationError) {
      setFormState(prev => ({ ...prev, error: validationError }));
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true, error: null, result: null }));
    setStatus('loading');

    try {
      // Chamar API
      const response: ClassifyResponse = await classifyText(formState.message);

      // Salvar resultado
      setFormState(prev => ({
        ...prev,
        result: response.data,
        isLoading: false
      }));
      setStatus('success');

    } catch (error) {
      setStatus('error');
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? `ERRO: ${error.message}` : 'ERRO: Falha na análise do sistema'
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, message: e.target.value, error: null }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleNewAnalysis = () => {
    setFormState({
      message: '',
      file: null,
      isLoading: false,
      error: null,
      result: null
    });
    setStatus('idle');
  };

  const getFormClassName = () => {
    let className = 'message-form';
    if (status === 'loading') className += ' message-form--loading';
    if (status === 'success') className += ' message-form--success';
    if (status === 'error') className += ' message-form--error';
    return className;
  };

  if (formState.result) {
    const formatted = formatClassificationResult(formState.result);

    return (
      <div className={getFormClassName()}>
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
                <h4>&gt; Resposta Sugerida:</h4>
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
                onClick={handleNewAnalysis}
              >
                &gt; Nova Análise
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className={getFormClassName()} onSubmit={handleSubmit}>
      <div className="message-form__header">
        <h2 className="message-form__title">Sistema de Análise</h2>
        <p className="message-form__description">
          &gt; Insira dados para processamento neural_
        </p>
      </div>

      <div className="message-form__field">
        <label htmlFor="message" className="message-form__label">
          &gt; Input:
        </label>
        <textarea
          id="message"
          name="message"
          className="message-form__textarea"
          placeholder="> Digite ou cole sua mensagem aqui...
> Sistema aguardando entrada de dados_"
          value={formState.message}
          onChange={handleInputChange}
          disabled={formState.isLoading}
          rows={8}
        />
      </div>

      {formState.error && (
        <div className="message-form__error">
          {formState.error}
        </div>
      )}

      <div className="message-form__actions">
        <button
          type="submit"
          className={`btn btn--primary ${formState.isLoading ? 'btn--loading' : ''}`}
          disabled={formState.isLoading || !formState.message.trim()}
        >
          <span className="btn__text">
            {formState.isLoading ? 'Processando...' : 'Executar Análise'}
          </span>
        </button>
      </div>

      <div className="message-form__info">
        <p className="message-form__info-text">
          &gt; Sistema neural ativo<br />
          &gt; Classificação: produtivo | improdutivo<br />
          &gt; Resposta automática: habilitada
        </p>
      </div>
    </form>
  );
};