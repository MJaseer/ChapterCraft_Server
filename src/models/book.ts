import mongoose, { Document, Schema } from "mongoose";

export interface Book {
    name: string;
    author: string;
    category: string;
    description: string;
    isAvailable: boolean;
    image: string;
    createdAt?: Date
}

export interface IBook extends Document {
    name: string;
    author: string;
    category: string;
    description: string;
    isAvailable: boolean;
    image: string;
    createdAt?: Date
}

const BookSchema = new Schema<IBook>({
    name: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true
})


export default mongoose.model<IBook>("Book", BookSchema);
