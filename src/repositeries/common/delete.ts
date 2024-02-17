import { Model } from "mongoose";
import { IUser } from "../../models/user.js";
import { ITransaction } from "../../models/transaction.js"
import { IProduct } from "../../models/product.js"


export const deleteOne = async (item: string, value: string, Schema: Model<ITransaction | IUser | IProduct>) => {
    try {
        const data = await Schema.deleteOne({ [item]: value }, { new: true });
        if (!data) throw new Error('No data found');
        return { message: `${item} succesfully deleted` }
    } catch (error) {
        console.log(error);
        if (error instanceof Error) throw new Error(`Failed to delete ${item}`);
        else throw error;
    }
}

export const deleteMany = async (item: string, value: string, Schema: Model<ITransaction | IUser | IProduct>) => {
    try {
        const data = await Schema.deleteMany({ [item]: value }, { new: true })
        if (!data) throw new Error('No data found');
        return { message: `${item} succesfully deleted` }
    } catch (error) {
        console.log(error);
        if (error instanceof Error) throw new Error(`Failed to delete ${item}`);
        else throw error;
    }
}
