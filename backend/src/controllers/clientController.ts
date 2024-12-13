import { Request, Response } from 'express';
import Client from '../models/Client';

// Crear un nuevo cliente (registro)
export const createClient = async (req: Request, res: Response): Promise<void> => {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).json({ message: 'Faltan datos requeridos' });
        return;
    }

    try {
        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            res.status(400).json({ message: 'El correo electrónico ya está en uso' });
            return;
        }

        const newClient = new Client({
            name,
            email,
            role: 'client', // Aseguramos que el rol sea 'client'
        });

        await newClient.save();
        res.status(201).json({ message: 'Cliente registrado exitosamente', client: newClient });
    } catch (error) {
        res.status(500).json({ message: 'Error registrando el cliente', error });
    }
};

// Obtener todos los clientes
export const getClients = async (req: Request, res: Response): Promise<void> => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo los clientes', error });
    }
};

// Obtener un cliente por ID
export const getClientById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const client = await Client.findById(id);
        if (!client) {
            res.status(404).json({ message: 'Cliente no encontrado' });
            return;
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo el cliente', error });
    }
};

// Actualizar un cliente por ID
export const updateClient = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).json({ message: 'Faltan datos requeridos' });
        return;
    }

    try {
        const updatedClient = await Client.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!updatedClient) {
            res.status(404).json({ message: 'Cliente no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Cliente actualizado exitosamente', client: updatedClient });
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando el cliente', error });
    }
};

// Eliminar un cliente por ID
export const deleteClient = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedClient = await Client.findByIdAndDelete(id);
        if (!deletedClient) {
            res.status(404).json({ message: 'Cliente no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando el cliente', error });
    }
};
