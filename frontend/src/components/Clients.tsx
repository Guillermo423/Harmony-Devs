import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

// Interfaz para los clientes
interface Client {
  _id: string; // MongoDB utiliza _id por defecto
  nombre: string;
  correo: string;
  telefono: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState<Client>({
    _id: '',
    nombre: '',
    correo: '',
    telefono: '',
  });

  // Obtener clientes desde el backend
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  // Función para mostrar el modal en modo editar
  const handleEdit = (client: Client) => {
    setIsEditMode(true);
    setCurrentClient(client);
    setNewClient(client);
    setShowModal(true);
  };

  // Función para mostrar el modal en modo agregar
  const handleAdd = () => {
    setIsEditMode(false);
    setNewClient({ _id: '', nombre: '', correo: '', telefono: '' });
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentClient(null);
  };

  // Función para manejar el cambio en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient(prevState => ({ ...prevState, [name]: value }));
  };

  // Función para enviar el formulario de cliente
  const handleSubmit = async () => {
    try {
      if (isEditMode && currentClient) {
        await axios.put(`http://localhost:5000/api/clients/${currentClient._id}`, newClient);
        setClients(clients.map(client => client._id === currentClient._id ? newClient : client));
      } else {
        const response = await axios.post('http://localhost:5000/api/clients', newClient);
        setClients([...clients, response.data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  // Función para eliminar un cliente
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/clients/${id}`);
      setClients(clients.filter(client => client._id !== id));
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Gestión de Clientes</h2>

      <Button variant="primary" onClick={handleAdd} className="mb-4">
        Agregar Cliente
      </Button>

      <div className="row">
        {clients.map(client => (
          <div key={client._id} className="col-md-4 mb-4">
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title>{client.nombre}</Card.Title>
                <Card.Text>
                  <strong>Correo:</strong> {client.correo}<br />
                  <strong>Teléfono:</strong> {client.telefono}
                </Card.Text>
                <Button variant="info" onClick={() => handleEdit(client)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(client._id)} className="ms-2">
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal de Agregar/Editar Cliente */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newClient.nombre}
                onChange={handleInputChange}
                placeholder="Ingrese el nombre"
              />
            </Form.Group>

            <Form.Group controlId="formCorreo" className="mt-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={newClient.correo}
                onChange={handleInputChange}
                placeholder="Ingrese el correo"
              />
            </Form.Group>

            <Form.Group controlId="formTelefono" className="mt-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={newClient.telefono}
                onChange={handleInputChange}
                placeholder="Ingrese el teléfono"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditMode ? 'Actualizar' : 'Agregar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Clients;
