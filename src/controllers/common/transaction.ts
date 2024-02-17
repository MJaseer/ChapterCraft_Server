import { Request, Response } from "express";

import dotenv from "dotenv";

import Finds from "../../repositeries/common/find.js";
import transactionSchema from "../../models/transaction.js";
import { payload } from "../../middlewares/autharisation/adminValidator.js";
dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: payload;
}


export class TransactionClass {

    private findService!: Finds

    constructor() {
        this.findService = new Finds()
    }

    getTransactions = async (res: Response, req: AuthenticatedRequest) => {
        try {
            const userId = req?.user?.userId

            if (!userId) res.status(400).json('Admin failed to authenticate')
            else {
                const transactionData = await this.findService.findOne('userId', userId, transactionSchema);
                if(transactionData) res.status(200).json(transactionData)
            }

        } catch (error) {
            if(error instanceof Error) res.status(500).json(error.message)
        }
    }

}
