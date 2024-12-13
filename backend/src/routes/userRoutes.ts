import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';  // Middleware de autenticación
import isAdmin from '../middleware/isAdmin';  // Middleware de verificación de admin

const router = express.Router();

// Ruta para registrar un nuevo usuario (abierta a todos)
router.post('/', createUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener la lista de todos los usuarios (requiere autenticación)
router.get('/', authMiddleware, getUsers);

// Ruta para obtener un usuario por su ID
router.get('/:id', authMiddleware, getUserById);

// Rutas que requieren privilegios de administrador
router.put('/:id', authMiddleware, isAdmin, updateUser);  // Solo admin puede actualizar
router.delete('/:id', authMiddleware, isAdmin, deleteUser);  // Solo admin puede eliminar

export default router;
