import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from 'cors'

import connectDataBase from "./config/database/mongo";
import userRoute from "./router/user/user-router";
import bookRoute from "./router/book/book-router"

import { VerifyAdmin } from "./middlewares/autharisation/adminValidator"

const app = express()

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:4200', '*']
    })
);


app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDataBase()

const adminVerificator = new VerifyAdmin()

app.use("/api", userRoute)
app.use("/api/book", adminVerificator.verifyToken, bookRoute)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`The server start at running on port ${port}`);
});