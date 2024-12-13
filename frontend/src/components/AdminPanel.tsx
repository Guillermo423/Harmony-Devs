import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Importaciones de los componentes
import ClientsList from './Clientes/ClientsList';
import ClientsForm from './Clientes/ClientsForm';
import InstrumentsList from './Instruments/InstrumentsList';
import InstrumentsForm from './Instruments/InstrumentsForm';
import UsersList from './Usuarios/UsersList';
import UsersForm from './Usuarios/UsersForm';

// Definición de interfaces
interface Client {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Instrument {
  _id: string;
  name: string;
  category: string;
  description: string;
  brand: string;
  price: number;
  image: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

const AdminPanel = () => {
  // Estados para almacenar los datos
  const [clients, setClients] = useState<Client[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Estados para los formularios
  const [showUserForm, setShowUserForm] = useState(false);
  const [showInstrumentForm, setShowInstrumentForm] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);

  // Efectos para obtener los datos de cada recurso
  useEffect(() => {
    axios.get<Client[]>('http://localhost:5000/api/clients')
      .then(response => setClients(response.data)) 
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get<Instrument[]>('http://localhost:5000/api/instruments')
      .then(response => setInstruments(response.data)) 
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get<User[]>('http://localhost:5000/api/users')
      .then(response => setUsers(response.data)) 
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Panel de Administración</h2>
      <nav>
        <ul>
          <li><Link to="/clients">Clientes</Link></li>
          <li><Link to="/instruments">Instrumentos</Link></li>
          <li><Link to="/users">Usuarios</Link></li>
        </ul>
      </nav>
      <div>
        {/* Botón para mostrar el formulario de registro de usuarios */}
        <button onClick={() => setShowUserForm(!showUserForm)}>
          {showUserForm ? 'Ocultar Formulario de Usuario' : 'Mostrar Formulario de Usuario'}
        </button>
        {/* Formulario de registro de usuarios */}
        {showUserForm && <UsersForm />}

        {/* Botón para mostrar el formulario de registro de instrumentos */}
        <button onClick={() => setShowInstrumentForm(!showInstrumentForm)}>
          {showInstrumentForm ? 'Ocultar Formulario de Instrumento' : 'Mostrar Formulario de Instrumento'}
        </button>
        {/* Formulario de registro de instrumentos */}
        {showInstrumentForm && <InstrumentsForm />}

        {/* Botón para mostrar el formulario de registro de clientes */}
        <button onClick={() => setShowClientForm(!showClientForm)}>
          {showClientForm ? 'Ocultar Formulario de Cliente' : 'Mostrar Formulario de Cliente'}
        </button>
        {/* Formulario de registro de clientes */}
        {showClientForm && <ClientsForm />}
      </div>
      <div>
        <h3>Clientes</h3>
        <ClientsList clients={clients} /> 
      </div>
      <div>
        <h3>Instrumentos</h3>
        <InstrumentsList instruments={instruments} /> 
      </div>
      <div>
        <h3>Usuarios</h3>
        <UsersList users={users} /> 
      </div>
    </div>
  );
};

export default AdminPanel; 