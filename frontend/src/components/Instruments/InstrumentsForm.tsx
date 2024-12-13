import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Instrument {
  _id: string;
  name: string;
  category: string;
  description: string;
  brand: string;
  price: number;
  image: string;
}

const InstrumentsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [instrument, setInstrument] = useState<Instrument>({
    _id: '',
    name: '',
    category: '',
    description: '',
    brand: '',
    price: 0,
    image: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios.get(`http://localhost:5000/api/instruments/${id}`)
        .then(response => {
          setInstrument(response.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', instrument.name);
      formData.append('category', instrument.category);
      formData.append('description', instrument.description);
      formData.append('brand', instrument.brand);
      formData.append('price', instrument.price.toString()); // Convierte el precio a string
      if (selectedImage) {
        formData.append('image', selectedImage); // Asigna el nombre correcto a la imagen
      }

      if (id) {
        await axios.put(`http://localhost:5000/api/instruments/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('http://localhost:5000/api/instruments', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      navigate('/instruments');
    } catch (err) {
      setError('Error al guardar el instrumento');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInstrument(prevInstrument => ({
      ...prevInstrument,
      [name]: name === 'price' ? parseFloat(value) : value, // Convierte el precio a número
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInstrument(prevInstrument => ({
      ...prevInstrument,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>{id ? 'Editar Instrumento' : 'Nuevo Instrumento'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={instrument.name}
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Categoría</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={instrument.category}
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={instrument.description}
            onChange={handleTextAreaChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Marca</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={instrument.brand}
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={instrument.price}
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Imagen</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image" // Asigna el atributo name="image"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

export default InstrumentsForm;