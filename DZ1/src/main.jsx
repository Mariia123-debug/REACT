import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // можно оставить пустым или добавить базовые стили

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);