import { Document, Model } from "mongoose";
import { User } from "../../models/user.js";
import { Transaction } from "../../models/transaction.js";
import { Product } from "../../models/product.js";

class Creates {

    create = async <T>(item: string, value: (User | Transaction | Product), itemSchema: Model<T & Document>) => {
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

export default Creates