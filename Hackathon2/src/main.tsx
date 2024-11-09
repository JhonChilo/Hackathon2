// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Asegúrate de que esto esté importado
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
