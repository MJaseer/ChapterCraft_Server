import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import userSchema, { IUser } from "../../models/user";
import { Finds } from "../../repositeries/common/find";
import { Creates } from "../../repositeries/common/create";
dotenv.config();

export class UserClass {

    private findService!: Finds
    private createService!: Creates

    constructor() {
        this.findService = new Finds()
        this.createService = new Creates()
    }

    userRegister = async (req: Request, res: Response) => {
        try {

            const { name, role, email, password }: IUser = req.body;

            const existingUser = await this.findService.findOne('email', email, userSchema, 'register');
            if (existingUser) return res.status(400).json({ error: "Email already exists" });

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const userData = { name, email, password: hashedPassword, role }
            const newUser = await this.createService.create('user', userData, userSchema)


            res.status(201).json({ user: newUser.email, name: newUser.name });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to register user" });
        }
    }

    userLogin = async (req: Request, res: Response) => {
        const { email, password }: IUser = req.body;
        try {
            const existingUser = await this.findService.findOne('email', email, userSchema);
            if (!existingUser) return res.status(400).json({ error: "User does not exist" });
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (!passwordMatch) return res.status(401).json({ error: "Incorrect password" });

            const payload = { userId: existingUser._id, role: existingUser.role }
            const jwtSecret = process.env.SECRET_KEY as string
            const token = jwt.sign(payload, jwtSecret,
                // {
                //     expiresIn: "7d",
                // }
            );

            res.status(200).json({ user: existingUser.email, token: `Bearer ${token}` });
        } catch (error) {
            res.status(500).json({ error: "Failed to login User" });
        };
    };

    updateProfile = async (res: Response, req: Request) => {
        try {
            const { name, role, email }: IUser = req.body;



        } catch (error) {

        }
    }

}
