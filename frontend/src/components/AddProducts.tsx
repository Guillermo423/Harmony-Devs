import React, { useState } from 'react';

const AddProduct = () => {
  const [product, setProduct] = useState({ name: '', category: '', price: 0, description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/instruments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Incluye el token si necesitas autenticación
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Producto agregado exitosamente.');
        setProduct({ name: '', category: '', price: 0, description: '' }); // Limpia el formulario
        console.log('Producto agregado:', data);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Hubo un error al conectar con el servidor.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Agregar Producto</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar Producto</button>
      </form>
    </div>
  );
};

export default AddProduct;
