import { Request, Response, NextFunction } from 'express';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Si el usuario es admin, continúa con la siguiente función o ruta
  } else {
    res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden realizar esta acción.' });
  }
};

export default isAdmin;
