import { Schema, model, Document } from 'mongoose';

interface IClient extends Document {
    name: string;
    email: string;
    role: string; // Se puede definir como 'client' para el cliente normal.
}

const clientSchema = new Schema<IClient>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'client' }, // El rol predeterminado es 'client'
});

const Client = model<IClient>('Client', clientSchema);

export default Client;
