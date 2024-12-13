import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Asegúrate de usar Routes
import Home from './components/Home';
import Login from './components/Login';
import Products from './components/Products';
import Navbar from './components/Navbar'; // Para la barra de navegación
import AdminPanel from './components/AdminPanel'; // Ejemplo de página protegida

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes> {/* Cambia Switch por Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin" element={<AdminPanel />} /> {/* Solo accesible con login */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
