import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User'; // Asegúrate de que la interfaz IUser esté correctamente importada

// Extiende la interfaz de Request para incluir la propiedad 'user'
declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Declara 'user' como un objeto de tipo IUser
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtén el token del header 'Authorization'

    if (!token) {
        res.status(403).json({ message: 'No token provided' });
        return; // Agrega un return explícito
    }

    try {
        // Verifica el token usando la clave secreta definida en .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
        req.user = decoded as IUser; // Asigna la información del usuario al objeto req
        next(); // Llama al siguiente middleware o ruta
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        return; // Agrega un return explícito
    }
};

export default authMiddleware;
