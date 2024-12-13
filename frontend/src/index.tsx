import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambiado a 'react-dom/client'
import App from './App'; // Importación de tu componente App

// Crear el contenedor raíz
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Renderizar el componente App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

