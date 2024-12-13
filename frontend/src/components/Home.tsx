import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IProduct {
  _id: string;
  name: string;
  category: string;
  description: string;
  brand: string;
  price: number;
  image: string;
}

const Home = () => {
  const [productos, setProductos] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/instruments');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4 text-center">Bienvenidos a la Tienda Musical</h1>
      <p className="text-center mb-4">
        En Cuerdas & Acordes, somos especialistas en instrumentos musicales de cuerda.
        Encuentra guitarras, bajos, violines, violonchelos y más, de las mejores marcas.
        Descubre la melodía perfecta para tu pasión.
      </p>
      <div className="row">
        {productos.map((producto) => (
          <div key={producto._id} className="col-md-4 mb-4">
            <div className="card shadow">
              <img
                src={producto.image}
                className="card-img-top"
                alt={producto.name}
              />
              <div className="card-body">
                <h5 className="card-title">{producto.name}</h5>
                <p className="card-text">
                  <strong>Marca:</strong> {producto.brand} <br />
                  <strong>Descripción:</strong> {producto.description} <br />
                  <strong>Precio:</strong> ${producto.price}
                </p>
                <a href={`/producto/${producto._id}`} className="btn btn-primary">
                  Añadir a carrito
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;