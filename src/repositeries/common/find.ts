import { Document, Model, Schema } from "mongoose";

class Finds{

    findOne = async <T>(item: string, value: string, itemSchema: Model<T & Document>,from?:string,) => {
        try {
            const filter: Record<string, string> = { [item]: value };
            const data = await itemSchema.findOne(filter);
            
            if (!data) if(from != 'register') throw new Error('No data found');
            
            return data 
        } catch (error) {
            console.log(error);
            if (error instanceof Error) throw new Error(`Failed to find ${item}`);
            else throw error;
        }
    }

    findMany = async <T>(item: string, value: string, itemSchema: Model<T & Document>) => {
        try {
            const filter: Record<string, string> = { [item]: value };
            const data = await itemSchema.find(filter)
            if (!data) throw new Error('No data found');
            return data
        } catch (error) {
            console.log(error);
            if (error instanceof Error) throw new Error(`Failed to find ${item}`);
            else throw error;
        }
    }

    findById = async <T>(item: string, id: string, itemSchema: Model<T & Document>) => {
        try {
            const data = await itemSchema.findById(id)
            if (!data) throw new Error('No data found');
            return data
        } catch (error) {
            console.log(error);
            if (error instanceof Error) throw new Error(`Failed to find ${item}`);
            else throw error;
        }
    }

}


export default Finds