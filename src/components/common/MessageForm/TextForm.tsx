interface TextFormProps {
  message: string;
  isLoading: boolean;
  error: string | null;
  onMessageChange: (message: string) => void;
  onSubmit: (message: string) => void;
  className: string;
}

export const TextForm = ({
  message,
  isLoading,
  error,
  onMessageChange,
  onSubmit,
  className
}: TextFormProps) => {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onMessageChange(e.target.value);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="message-form__header">
        <h2 className="message-form__title">Análise de Texto</h2>
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
          value={message}
          onChange={handleInputChange}
          disabled={isLoading}
          rows={8}
        />
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
          disabled={isLoading || !message.trim()}
        >
          <span className="btn__text">
            {isLoading ? 'Processando...' : 'Executar Análise'}
          </span>
        </button>
      </div>

      <div className="message-form__info">
        <p className="message-form__info-text">
          &gt; Classificação: produtivo | improdutivo<br />
          &gt; Resposta automática: habilitada
        </p>
      </div>
    </form>
  );
};