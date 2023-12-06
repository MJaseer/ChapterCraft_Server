import mongoose, { Document, Schema, Types } from "mongoose";

export enum UserRole {
    Admin = 'admin',
    User = 'user',
}

export interface User {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt?: Date
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt?: Date;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
}, {
    timestamps: true
})


export default mongoose.model<IUser>("User", userSchema);
