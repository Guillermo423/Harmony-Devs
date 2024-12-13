// clientRoutes.ts
import express from 'express';
import { createClient, getClients, getClientById, updateClient, deleteClient } from '../controllers/clientController';

const router = express.Router();

// Ruta para crear un nuevo cliente
router.post('/register', createClient);

// Ruta para obtener todos los clientes
router.get('/', getClients);

// Ruta para obtener un cliente por ID
router.get('/:id', getClientById);

// Ruta para actualizar un cliente por ID
router.put('/:id', updateClient);

// Ruta para eliminar un cliente por ID
router.delete('/:id', deleteClient);

export default router;
