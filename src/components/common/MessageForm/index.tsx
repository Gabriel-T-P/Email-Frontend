import { useMessageForm } from '@/hooks/useMessageForm';
import { TextForm } from './TextForm';
import { FileUpload } from './FileUpload';
import { ResultDisplay } from './ResultDisplay';
import { TabSwitcher } from './TabSwitcher';

export const MessageForm = () => {
  const {
    formState,
    activeTab,
    handleTextSubmit,
    handleFileSubmit,
    resetForm,
    updateMessage,
    updateFile,
    changeTab,
    getFormClassName,
    hasResult,
    isLoading,
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

  // Formulário com tabs
  return (
    <div className="message-form-container">
      <TabSwitcher
        activeTab={activeTab}
        onTabChange={changeTab}
        disabled={isLoading}
      />

      {activeTab === 'text' ? (
        <TextForm
          message={formState.message}
          isLoading={isLoading}
          error={formState.error}
          onMessageChange={updateMessage}
          onSubmit={handleTextSubmit}
          className={getFormClassName()}
        />
      ) : (
        <FileUpload
          file={formState.file}
          isLoading={isLoading}
          error={formState.error}
          onFileChange={updateFile}
          onSubmit={handleFileSubmit}
          className={getFormClassName()}
        />
      )}
    </div>
  );
};