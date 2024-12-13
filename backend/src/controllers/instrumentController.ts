import { Request, Response } from 'express';
import Instrument from '../models/Instrument';
import { v2 as cloudinary } from 'cloudinary';

// Crear un nuevo instrumento (solo administradores)
export const createInstrument = async (req: Request, res: Response) => {
    try {
        console.log("Datos recibidos en la solicitud:", req.body);
        const { name, category, description, brand, price } = req.body;

        let imageUrl = '';
        if (req.file) {
            console.log("Archivo recibido:", req.file);
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const newInstrument = new Instrument({
            name,
            category,
            description,
            brand,
            price,
            image: imageUrl,
        });

        await newInstrument.save();
        res.status(201).json({ mensaje: 'Instrumento creado con éxito', instrumento: newInstrument });
    } catch (error) {
        console.error("Error al crear instrumento:", error);
        res.status(500).json({ mensaje: 'Error al crear el instrumento', error: (error as Error).message });
    }
};


// Obtener todos los instrumentos (listar)
export const getInstruments = async (req: Request, res: Response): Promise<void> => {
    try {
        const instruments = await Instrument.find();
        res.status(200).json(instruments);
    } catch (error) {
        console.error("Error getting instruments:", error);
        res.status(500).json({ message: 'Error obteniendo los instrumentos', error: (error as Error)?.message || 'Error desconocido' });
    }
};

// Obtener un instrumento por su ID
export const getInstrumentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const instrument = await Instrument.findById(req.params.id);
        if (!instrument) {
            res.status(404).json({ message: 'Instrumento no encontrado' });
            return;
        }
        res.status(200).json(instrument);
    } catch (error) {
        console.error("Error getting instrument by ID:", error);
        res.status(500).json({ message: 'Error obteniendo el instrumento', error: (error as Error)?.message || 'Error desconocido' });
    }
};

// Actualizar un instrumento (solo administradores)
export const updateInstrument = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, category, description, brand, price } = req.body;
        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const updatedInstrument = await Instrument.findByIdAndUpdate(
            req.params.id,
            {
                name,
                category,
                description,
                brand,
                price,
                ...(imageUrl && { image: imageUrl }),
            },
            { new: true }
        );

        if (!updatedInstrument) {
            res.status(404).json({ message: 'Instrumento no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Instrumento actualizado con éxito', instrument: updatedInstrument });
    } catch (error) {
        console.error("Error updating instrument:", error);
        res.status(500).json({ message: 'Error actualizando el instrumento', error: (error as Error)?.message || 'Error desconocido' });
    }
};

// Eliminar un instrumento (solo administradores)
export const deleteInstrument = async (req: Request, res: Response): Promise<void> => {
    try {
        const instrument = await Instrument.findByIdAndDelete(req.params.id);
        if (!instrument) {
            res.status(404).json({ message: 'Instrumento no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Instrumento eliminado con éxito' });
    } catch (error) {
        console.error("Error deleting instrument:", error);
        res.status(500).json({ message: 'Error eliminando el instrumento', error: (error as Error)?.message || 'Error desconocido' });
    }
};