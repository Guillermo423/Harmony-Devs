import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;  // Definir el tipo de _id como ObjectId
    name: string;
    email: string;
    password: string;  
    role: string;
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
}, {
    timestamps: true,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
