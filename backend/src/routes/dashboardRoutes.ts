import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import authMiddleware from '../middleware/authMiddleware';  // Middleware de autenticación
import isAdmin from '../middleware/isAdmin';  // Middleware de verificación de admin

const router = express.Router();

// Ruta para obtener estadísticas del dashboard (solo admin)
router.get('/stats', authMiddleware, isAdmin, getDashboardStats);

export default router;
