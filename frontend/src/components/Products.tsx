import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string; // Agrega la propiedad 'image'
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Obtener productos desde el backend (simulando con axios)
  useEffect(() => {
    axios.get('http://localhost:5000/api/instruments')
      .then((response) => {
        setProducts(response.data); 
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Error al cargar los productos');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Productos</h2>
      
      {/* Mostrar error si hay algún problema al cargar los productos */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Mostrar cargando mientras se obtiene la data */}
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4" key={product.id}>
              <div className="card mb-4 shadow-sm">
                <img src={product.image} className="card-img-top" alt={product.name} /> {/* Agrega la imagen */}
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text"><strong>Precio:</strong> ${product.price}</p>
                  <button className="btn btn-primary" onClick={() => alert(`Ver detalles de ${product.name}`)}>
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;