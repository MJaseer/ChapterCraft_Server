import mongoose, { Document, Schema } from "mongoose";

export interface Product {
    name: string;
    author: string;
    category: string;
    description: string;
    isAvailable: boolean;
    image: string;
    createdAt?: Date
}

export interface IProduct extends Document {
    name: string;
    author: string;
    category: string;
    description: string;
    isAvailable: boolean;
    image:any;
    createdAt?: Date
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, required: true },
    image: { type: Array,default : [] , required: true },
}, {
    timestamps: true
})


export default mongoose.model<IProduct>("Product", ProductSchema);
