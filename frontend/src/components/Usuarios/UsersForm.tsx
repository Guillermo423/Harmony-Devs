import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

const UsersForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<User>({
    _id: '',
    name: '',
    email: '',
    password: '',
    role: 'user', // Por defecto, el rol es 'user'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios.get(`http://localhost:5000/api/users/${id}`)
        .then(response => {
          setUser(response.data);
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
      if (id) {
        await axios.put(`http://localhost:5000/api/users/${id}`, user);
      } else {
        await axios.post('http://localhost:5000/api/users', user);
      }
      navigate('/users');
    } catch (err) {
      setError('Error al guardar el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>{id ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Rol</label>
          <select
            className="form-select"
            id="role"
            value={user.role}
            onChange={handleChange}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

export default UsersForm; 