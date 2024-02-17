import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

import { IUser } from '../../models/user.js';

dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: payload;
}

export interface payload {
    userId:string,
}
export class VerifyAdmin {

    verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;

        if (!token) {
            const error = new Error('No token provided') as any;
            error.statusCode = 401;
            res.status(401).json(error)
            return next(error);
        }

        try {
            const realToken = token.split(' ')[1]
            const jwtSecret = process.env.SECRET_KEY as string
            const decoded = jwt.verify(realToken, jwtSecret) as payload
            
            if (decoded) {
                req.user = decoded;
                next();
            }
        } catch (error) {
            if(error instanceof Error)
            console.log('jwt error',error.message);
            res.status(400).json('Authentication failed')
        }
    };
}



