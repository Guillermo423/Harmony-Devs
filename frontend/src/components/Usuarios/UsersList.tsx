import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

const UsersList = ({ users }: { users: User[] }) => { // Recibe la prop 'users'
  const handleDeleteUser = async (userId: string) => {
    // Confirmación para eliminar el usuario
    if (window.confirm(`¿Estás seguro de que quieres eliminar al usuario ${users.find(u => u._id === userId)?.name}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        // Actualiza la lista de usuarios después de eliminar
        // setUsers(users.filter(user => user._id !== userId)); // Ya no necesitas actualizar el estado aquí
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <Link to="/users/new" className="btn btn-primary mb-3">
        Nuevo Usuario
      </Link>
      <ul>
        {users.map(user => ( // Utiliza la prop 'users' para renderizar la lista
          <li key={user._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <p className="card-text">Rol: {user.role}</p>
                <div className="d-flex justify-content-end">
                  <Link to={`/users/${user._id}/edit`} className="btn btn-warning me-2">
                    Editar
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList; 