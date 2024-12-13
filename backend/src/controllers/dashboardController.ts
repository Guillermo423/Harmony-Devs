import { Request, Response } from 'express';
import User from '../models/User';
import Instrument from '../models/Instrument';

// Ver estadísticas generales para el dashboard (solo admin)
export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const totalUsers = await User.countDocuments();
        const totalInstruments = await Instrument.countDocuments();
        const instruments = await Instrument.find();

        res.status(200).json({
            totalUsers,
            totalInstruments,
            instruments,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo las estadísticas', error });
    }
};
