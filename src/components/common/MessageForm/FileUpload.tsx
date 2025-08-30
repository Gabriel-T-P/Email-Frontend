import React, { useRef, useState } from 'react';

interface FileUploadProps {
  file: File | null;
  isLoading: boolean;
  error: string | null;
  onFileChange: (file: File | null) => void;
  onSubmit: (file: File) => void;
  className: string;
}

export const FileUpload = ({
  file,
  isLoading,
  error,
  onFileChange,
  onSubmit,
  className
}: FileUploadProps) => {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit(file);
    }
  };

  const handleFileSelect = (selectedFile: File | null) => {
    onFileChange(selectedFile);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileSelect(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    handleFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDropZoneClassName = () => {
    let className = 'file-upload__dropzone';
    if (dragActive) className += ' file-upload__dropzone--active';
    if (error) className += ' file-upload__dropzone--error';
    if (file) className += ' file-upload__dropzone--has-file';
    return className;
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="message-form__header">
        <h2 className="message-form__title">Upload de Arquivo</h2>
        <p className="message-form__description">
          &gt; Selecione arquivo para análise neural_
        </p>
      </div>

      <div className="message-form__field">
        <label className="message-form__label">
          &gt; Arquivo (PDF ou TXT):
        </label>

        <div
          className={getDropZoneClassName()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.pdf,text/plain,application/pdf"
            onChange={handleInputChange}
            disabled={isLoading}
            className="file-upload__input"
          />

          {!file ? (
            <>
              <div className="file-upload__text">
                &gt; Arraste arquivo aqui
              </div>
              <div className="file-upload__hint">
                ou clique para selecionar
              </div>
              <div className="file-upload__formats">
                Suportado: .txt, .pdf (máx 10MB)
              </div>
            </>
          ) : (
            <div className="file-upload__selected">
              <div className="file-upload__file-info">
                <div className="file-upload__file-name">
                  &gt; {file.name}
                </div>
                <div className="file-upload__file-details">
                  {formatFileSize(file.size)} • {file.type || 'Tipo desconhecido'}
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="file-upload__remove"
                disabled={isLoading}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="message-form__error">
          {error}
        </div>
      )}

      <div className="message-form__actions">
        <button
          type="submit"
          className={`btn btn--primary ${isLoading ? 'btn--loading' : ''}`}
          disabled={isLoading || !file}
        >
          <span className="btn__text">
            {isLoading ? 'Processando...' : 'Analisar Arquivo'}
          </span>
        </button>
      </div>

      <div className="message-form__info">
        <p className="message-form__info-text">
          &gt; Classificação: produtivo | improdutivo<br />
          &gt; Extração de texto: automática
        </p>
      </div>
    </form>
  );
};