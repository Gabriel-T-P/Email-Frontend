import { MessageForm } from '@/components/common/MessageForm';
import { Layout } from '@/components/common/Layout';

export const Home = () => {
  return (
    <Layout>
      <div className="main__content">
        <h1 className="main__title">Neural Classifier</h1>
        <p className="main__subtitle">&gt; Análise de Emails</p>

        <MessageForm />
      </div>
    </Layout>
  );
};