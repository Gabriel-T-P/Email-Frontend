# 📧 Email Classifier Frontend

Interface web desenvolvida em **React + TypeScript** para classificação
automática de emails utilizando IA.

🔗 **Acesse a aplicação:**
[email-frontend-nu.vercel.app](https://email-frontend-nu.vercel.app/)

## 🚀 Tecnologias

-   **React 18** + **TypeScript**\
-   **Vite** → build e ambiente de desenvolvimento rápido\
-   **Sass (BEM)** → estilos organizados e escaláveis\
-   **React Query** → gerenciamento de estado assíncrono\
-   **Axios** → requisições HTTP

## 📦 Instalação e Uso

1.  Clone o repositório:

    ``` bash
    git clone https://github.com/seu-usuario/email-classifier-frontend.git
    cd email-classifier-frontend
    ```

2.  Instale as dependências:

    ``` bash
    npm install
    ```

3.  Configure as variáveis de ambiente:

    ``` bash
    cp .env.example .env.local
    # edite o arquivo conforme necessário
    ```

4.  Execute o servidor de desenvolvimento:

    ``` bash
    npm run dev
    ```

A aplicação ficará disponível em **http://localhost:3000/** ou na porta que aparecer no terminal.

## 🛠️ Scripts Disponíveis

  Script                 Descrição
  ---------------------- -------------------------------------------
  `npm run dev`          Inicia o servidor de desenvolvimento
  `npm run build`        Gera a build de produção
  `npm run preview`      Visualiza a build localmente
  `npm run lint`         Analisa o código com ESLint
  `npm run lint:fix`     Corrige problemas de lint automaticamente
  `npm run format`       Formata o código com Prettier
  `npm run type-check`   Verifica os tipos TypeScript

## 📁 Estrutura do Projeto

``` bash
src/
├── components/    # Componentes reutilizáveis
├── hooks/         # Custom hooks
├── pages/         # Páginas da aplicação
├── services/      # APIs e integrações
├── styles/        # Estilos Sass (BEM)
├── types/         # Definições de tipos TypeScript
└── utils/         # Funções utilitárias
```

## 👀 Preview

### Tela inicial

![Preview da tela inicial](./docs/screenshots/home.png)

### Exemplo de classificação

![Exemplo de classificação de
email](./docs/screenshots/classification.png)

> As imagens acima são exemplos. Coloque prints reais em
> `docs/screenshots/`.
