import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        // Conecta con MongoDB usando la URI de MongoDB proporcionada en el .env
        await mongoose.connect(process.env.MONGO_URI || ''); 
        console.log('MongoDB connected');
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);  // Termina el proceso si hay error de conexión
    }
};

export default connectDB;
