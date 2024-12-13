import express from 'express';
import { createInstrument, getInstruments, getInstrumentById, updateInstrument, deleteInstrument } from '../controllers/instrumentController';
import authMiddleware from '../middleware/authMiddleware';
import isAdmin from '../middleware/isAdmin';
import getMulterInstance from '../utils/multer'; // Importa la función getMulterInstance

const router = express.Router();

// Rutas para manejar los instrumentos
router.route('/')
    .get(getInstruments)
    router.route('/')
    .post(authMiddleware, isAdmin, async (req, res, next) => {
        try {
            const multerInstance = await getMulterInstance();
            multerInstance.single('image')(req, res, (err) => {
                if (err) {
                    return res.status(400).json({ error: 'Error al cargar la imagen', details: err.message });
                }
                next();
            });
        } catch (err) {
            res.status(500).json({ error: 'Error inicializando multer', details: (err as Error).message });
        }
    }, createInstrument);


router.route('/:id')
    .get(getInstrumentById)
    .put(authMiddleware, isAdmin, async (req, res, next) => {
        const multerInstance = await getMulterInstance();
        multerInstance.single('image')(req, res, (err) => {
            if (err) {
                return next(err); // Manejo de errores de multer
            }
            next();
        });
    }, updateInstrument)
    .delete(authMiddleware, isAdmin, deleteInstrument);

export default router;