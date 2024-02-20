import { Request, Response } from "express";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import Finds from "../../repositeries/common/find.js";
import transactionSchema from "../../models/transaction.js";
import { payload } from "../../middlewares/autharisation/adminValidator.js";
import { IUser } from "src/models/user.js";

dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: payload;
}

class AdminClass {

    findService!: Finds

    constructor() {
        this.findService = new Finds()
    }

    adminLogin = async (req: Request, res: Response) => {
        // let findService: Finds = new Finds()
        // let createService: Creates = new Creates()
        console.log("on controller")
        try {
            const { email, password }: IUser = req.body;

            // const existingUser = await this.findService.findOne('email', email, userSchema);
            // if (!existingUser) return res.status(400).json({ error: "User does not exist" });
            // const passwordMatch = await bcrypt.compare(password, existingUser.password);
            // if (!passwordMatch) return res.status(401).json({ error: "Incorrect password" });
            const adminPass = process.env.adminPass
            const adminMail = process.env.adminMail
            const jwtSecret = process.env.SECRET_KEY as string

            if (email == adminMail && password == adminPass) {

                const token = jwt.sign({ userId: adminMail }, jwtSecret as string, { expiresIn: "7d", });
                res.json({ user: adminMail, token: `Bearer ${token}`,role:'admin' })
            } else {
                res.status(401).json('Authentication failed')
            }

            // const token = jwt.sign(
            //     { userId: existingUser._id },
            //     process.env.SECRET_KEY as string,
            //     {
            //         expiresIn: "7d",
            //     }
            // );

            // res.status(200).json({ user: existingUser.email, token: `Bearer ${token}` });
        } catch (error) {
            res.status(500).json({ error: "Failed to login User" });
        }
    };

    getTransactions = async (res: Response, req: AuthenticatedRequest) => {
        try {
            const userId = req?.user?.userId

            if (!userId) res.status(400).json('Admin failed to authenticate')
            else {
                const transactionData = await this.findService.findOne('userId', userId, transactionSchema);
                if (transactionData) res.status(200).json(transactionData)
            }

        } catch (error) {
            if (error instanceof Error) res.status(500).json(error.message)
        }
    }

}

export default AdminClass