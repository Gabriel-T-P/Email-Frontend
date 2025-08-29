import React, { useState } from 'react';
import type { FormState, FormStatus } from '@/types';

interface MessageFormProps {
  onSubmit: (message: string) => Promise<void>;
}

export const MessageForm = ({ onSubmit }: MessageFormProps) => {
  const [formState, setFormState] = useState<FormState>({
    message: '',
    isLoading: false,
    error: null,
    result: null
  });

  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.message.trim()) {
      setFormState(prev => ({ ...prev, error: 'ERRO: Mensagem requerida para análise.' }));
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true, error: null }));
    setStatus('loading');

    try {
      await onSubmit(formState.message);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setFormState(prev => ({
        ...prev,
        error: error instanceof Error ? `ERRO: ${error.message}` : 'ERRO: Falha na análise do sistema'
      }));
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, message: e.target.value, error: null }));
    if (status !== 'idle') setStatus('idle');
  };

  const getFormClassName = () => {
    let className = 'message-form';
    if (status === 'loading') className += ' message-form--loading';
    if (status === 'success') className += ' message-form--success';
    if (status === 'error') className += ' message-form--error';
    return className;
  };

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
          placeholder="> Digite ou cole seu e-mail aqui...
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