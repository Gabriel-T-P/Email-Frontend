import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <a href="/" className="header__brand">
          &gt; Neural.Classifier_
        </a>
      </div>
    </header>
  );
};

export const Footer = () => {
  const appVersion = import.meta.env.VITE_APP_VERSION;
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__text">&gt; System © 2025 V{appVersion}</p>
        <div className="footer__links">
          <a href="#" className="footer__link">Manual</a>
          <a href="#" className="footer__link">About</a>
          <a href="#" className="footer__link">Contact</a>
        </div>
      </div>
    </footer>
  );
};