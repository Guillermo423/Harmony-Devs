import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

// Definimos el tipo Client según lo que retorna el backend
interface Client {
  _id: string; // Usamos `_id` tal como lo envía el backend
  name: string;
  email: string;
  role: string; // Incluimos esta propiedad si es relevante
}

const ClientsList = ({ clients }: { clients: Client[] }) => { // Recibe la prop 'clients'
  const handleDeleteClient = async (clientId: string) => {
    // Confirmación para eliminar el cliente
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${clients.find(c => c._id === clientId)?.name}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/clients/${clientId}`);
        // Actualiza la lista de clientes después de eliminar
        // setClients(clients.filter(client => client._id !== clientId)); // Ya no necesitas actualizar el estado aquí
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <Link to="/clients/new" className="btn btn-primary mb-3">
        Nuevo Cliente
      </Link>
      <ul>
        {clients.map(client => ( // Utiliza la prop 'clients' para renderizar la lista
          <li key={client._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{client.name}</h5>
                <p className="card-text">{client.email}</p>
                <div className="d-flex justify-content-end">
                  <Link to={`/clients/${client._id}/edit`} className="btn btn-warning me-2">
                    Editar
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDeleteClient(client._id)}>
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

export default ClientsList; 