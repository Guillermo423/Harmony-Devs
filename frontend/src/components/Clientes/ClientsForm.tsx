import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Definimos el tipo Client según lo que retorna el backend
interface Client {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const ClientsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [client, setClient] = useState<Client>({
    _id: '',
    name: '',
    email: '',
    role: 'client',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios.get(`/api/clients/${id}`) 
        .then(response => {
          setClient(response.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError('Error al cargar los datos del cliente');
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (id) {
        await axios.put(`/api/clients/${id}`, client); 
      } else {
        await axios.post('/api/clients', client); 
      }
      navigate('/clients');
    } catch (err) {
      console.error(err);
      setError('Error al guardar el cliente');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient(prevClient => ({
      ...prevClient,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>{id ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            name="name" // Atributo necesario para handleChange
            className="form-control"
            id="name"
            value={client.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email" // Atributo necesario para handleChange
            className="form-control"
            id="email"
            value={client.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

export default ClientsForm;