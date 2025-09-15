import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// PWA Service Worker Registration
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(err => {
          console.error('ServiceWorker registration failed: ', err);
        });
    });
  }
};

const Main = () => {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<Main />);
