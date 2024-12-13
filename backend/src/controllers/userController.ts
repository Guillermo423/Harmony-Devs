import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

// Generar token JWT
const generateToken = (id: string, role: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Falta la clave JWT_SECRET en el archivo .env');
    }
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Crear un nuevo usuario (registro)
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;  // Incluye 'role'

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Usuario ya registrado con ese correo' });
            return;
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,  // Agregar 'role' aquí
        });

        await newUser.save();

        // Generar token
        const token = generateToken(newUser._id.toString(), newUser.role);


        res.status(201).json({
            message: 'Usuario creado con éxito',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role, // Incluir 'role' en la respuesta
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creando el usuario', error });
    }
};

// Obtener todos los usuarios (listar)
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo los usuarios', error });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo el usuario', error });
    }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;

        const updatedData: any = { name, email, role };

        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando el usuario', error });
    }
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando el usuario', error });
    }
};

// Login de usuario
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Credenciales incorrectas' });
            return;
        }

        // Generar token
        const token = generateToken(user._id.toString(), user.role);


        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role, // Incluir 'role' en la respuesta
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error iniciando sesión', error });
    }
};
