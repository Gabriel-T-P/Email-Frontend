import { useState } from 'react';
import type { FormState, FormStatus, ClassifyResponse, InputType } from '@/types';
import { classifyText, classifyFile } from '@/services/api';
import { validateMessageContent, validateFile } from '@/utils/classification';

export const useMessageForm = () => {
  const [formState, setFormState] = useState<FormState>({
    message: '',
    file: null,
    isLoading: false,
    error: null,
    result: null
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [activeTab, setActiveTab] = useState<InputType>('text');

  // Submeter texto
  const handleTextSubmit = async (message: string) => {
    const validationError = validateMessageContent(message);
    if (validationError) {
      setFormState(prev => ({ ...prev, error: validationError }));
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true, error: null, result: null }));
    setStatus('loading');

    try {
      const response: ClassifyResponse = await classifyText(message);
      setFormState(prev => ({
        ...prev,
        result: response.data,
        isLoading: false
      }));
      setStatus('success');
    } catch (error) {
      handleError(error);
    }
  };

  // Submeter arquivo
  const handleFileSubmit = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setFormState(prev => ({ ...prev, error: validationError }));
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true, error: null, result: null }));
    setStatus('loading');

    try {
      const response: ClassifyResponse = await classifyFile(file);
      setFormState(prev => ({
        ...prev,
        result: response.data,
        isLoading: false
      }));
      setStatus('success');
    } catch (error) {
      handleError(error);
    }
  };

  // Tratamento de erro centralizado
  const handleError = (error: unknown) => {
    setStatus('error');
    setFormState(prev => ({
      ...prev,
      isLoading: false,
      error: error instanceof Error ? `ERRO: ${error.message}` : 'ERRO: Falha na análise do sistema'
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormState({
      message: '',
      file: null,
      isLoading: false,
      error: null,
      result: null
    });
    setStatus('idle');
  };

  // Update message
  const updateMessage = (message: string) => {
    setFormState(prev => ({ ...prev, message, error: null }));
    if (status !== 'idle') setStatus('idle');
  };

  // Update file
  const updateFile = (file: File | null) => {
    setFormState(prev => ({ ...prev, file, error: null }));
    if (status !== 'idle') setStatus('idle');
  };

  // Change tab and clear errors
  const changeTab = (tab: InputType) => {
    setActiveTab(tab);
    setFormState(prev => ({ ...prev, error: null }));
  };

  // Clear error
  const clearError = () => {
    setFormState(prev => ({ ...prev, error: null }));
  };

  // Get CSS classes
  const getFormClassName = () => {
    let className = 'message-form';
    if (status === 'loading') className += ' message-form--loading';
    if (status === 'success') className += ' message-form--success';
    if (status === 'error') className += ' message-form--error';
    return className;
  };

  return {
    // State
    formState,
    status,
    activeTab,

    // Actions
    handleTextSubmit,
    handleFileSubmit,
    resetForm,
    updateMessage,
    updateFile,
    clearError,
    changeTab,

    // Computed
    getFormClassName,

    // Flags
    hasResult: !!formState.result,
    isLoading: formState.isLoading,
    hasError: !!formState.error,
  };
};