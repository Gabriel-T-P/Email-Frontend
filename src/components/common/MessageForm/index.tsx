import { useMessageForm } from '@/hooks/useMessageForm';
import { TextForm } from './TextForm';
import { ResultDisplay } from './ResultDisplay';
// import { FileUpload } from './FileUpload'; // Para o futuro
// import { TabSwitcher } from './TabSwitcher'; // Para o futuro

export const MessageForm = () => {
  const {
    formState,
    status,
    activeTab,
    handleTextSubmit,
    // handleFileSubmit,
    resetForm,
    updateMessage,
    // updateFile,
    getFormClassName,
    hasResult,
    isLoading,
    hasError,
  } = useMessageForm();

  // Se tem resultado, mostrar tela de resultado
  if (hasResult && formState.result) {
    return (
      <ResultDisplay
        result={formState.result}
        onNewAnalysis={resetForm}
        className={getFormClassName()}
      />
    );
  }

  // Por enquanto, apenas formulário de texto
  // No futuro, aqui teremos:
  // - TabSwitcher para alternar entre texto/arquivo
  // - Condicional para mostrar TextForm ou FileUpload baseado em activeTab

  return (
    <TextForm
      message={formState.message}
      isLoading={isLoading}
      error={formState.error}
      onMessageChange={updateMessage}
      onSubmit={handleTextSubmit}
      className={getFormClassName()}
    />
  );
};