import { Document, Model } from "mongoose";
import { User } from "../../models/user.js";
import { Transaction } from "../../models/transaction.js";
import { Book } from "../../models/book.js";

export class Creates {

    create = async <T>(item: string, value: (User | Transaction | Book), itemSchema: Model<T & Document>) => {
        try {
            const data = new itemSchema(value)
            if (!data) throw new Error('No data found');
            const saveData = await data.save()
            return saveData
        } catch (error) {
            console.log(error);
            if (error instanceof Error) throw new Error(`Failed to create ${item}`);
            else throw error;
        }
    }

}

