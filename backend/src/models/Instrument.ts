import mongoose, { Document, Schema } from 'mongoose';

// Interfaz para definir la estructura de un instrumento
interface IInstrument extends Document {
    name: string;
    category: string;
    description: string;
    brand: string;  // Marca relacionada con el instrumento
    price: number;
    image: string;
}

// Esquema de instrumento
const instrumentSchema: Schema<IInstrument> = new Schema({
    // Información básica del instrumento
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    // Información relacionada con la marca
    brand: {  
        type: String,
        required: true,
    },

    // Detalles del precio y la imagen
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Para manejar las fechas de creación y actualización
});

const Instrument = mongoose.model<IInstrument>('Instrument', instrumentSchema);

export default Instrument;
