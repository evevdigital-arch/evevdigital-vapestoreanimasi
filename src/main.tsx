import React from 'react';
import ReactDOM from 'react-dom/client';

// Console Watermark
console.log(
  "%c✨ Designed & Developed by evevdigital ✨",
  "color: #D4AF37; font-size: 16px; font-weight: bold; background: #0a0a0a; padding: 10px 20px; border-radius: 8px;"
);
console.log("https://github.com/evevdigital-arch");
import App from './App';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
);
