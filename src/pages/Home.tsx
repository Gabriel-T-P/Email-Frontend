import { MessageForm } from '@/components/common/MessageForm';
import { Layout } from '@/components/common/Layout';

export const Home = () => {
  // Função simulada - depois conectaremos com a API real
  const handleMessageSubmit = async (message: string) => {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Simular processamento
    console.log('> Processando entrada neural:', message);
    console.log('> Status: Análise completa');

    // Aqui será a chamada real para a API
    // const result = await apiService.classifyMessage(message);

    // Feedback terminal style
    alert('> SISTEMA: Análise neural completa\n> STATUS: Classificação executada\n> OUTPUT: Dados processados com sucesso');
  };

  return (
    <Layout>
      <div className="main__content">
        <h1 className="main__title">Neural Classifier</h1>
        <p className="main__subtitle">&gt; Análise de Emails</p>

        <MessageForm onSubmit={handleMessageSubmit} />
      </div>
    </Layout>
  );
};