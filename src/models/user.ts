import mongoose, { Document, Schema, Types } from "mongoose";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address?: Types.ObjectId;
    phone: number;
    createdAt?: Date
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address?: Types.ObjectId;
    phone: number;
    createdAt?: Date
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
    },
}, {
    timestamps: true
})

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model<IUser>("User", userSchema);
