import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import instrumentRoutes from './routes/instrumentRoutes';
import userRoutes from './routes/userRoutes';
import clientRoutes from './routes/clientRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import connectDB from './utils/db';
import authMiddleware from './middleware/authMiddleware'; 

dotenv.config(); // Cargar las variables de entorno

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Permitir recibir datos en formato JSON

// Rutas sin middleware de autenticación
app.use('/api/instruments', instrumentRoutes);
app.use('/api/clients', clientRoutes);

// Rutas protegidas por el middleware de autenticación
app.use('/api/users', userRoutes);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);

export default app;
