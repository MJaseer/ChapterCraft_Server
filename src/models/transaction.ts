import mongoose, { Document, Schema, Types } from "mongoose";

export interface Transaction {
    userId: Types.ObjectId;
    bookId: Types.ObjectId;
    borrowedDate:Date;
    returnedDate:Date;
    createdAt?: Date
}

export interface ITransaction extends Document {
    userId: Types.ObjectId;
    bookId: Types.ObjectId;
    borrowedDate:Date;
    returnedDate:Date
    createdAt?: Date
}

const TransactionSchema = new Schema<ITransaction>({
    userId: { type: Schema.Types.ObjectId, required: true },
    bookId: { type: Schema.Types.ObjectId, required: true },
    borrowedDate: { type: Date, required: true },
    returnedDate: { type: Date },
}, {
    timestamps: true
})

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
