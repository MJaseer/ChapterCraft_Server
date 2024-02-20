import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from 'cors'

import connectDataBase from "./config/database/mongo.js";
import userRoute from "./router/user/user-router.js";
import productRoute from "./router/product/product-router.js"

import { VerifyAdmin } from "./middlewares/autharisation/adminValidator.js"

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

// const adminVerificator = new VerifyAdmin()

app.use("/api", userRoute)
app.use("/api/product", productRoute)

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`The server start at running on port ${port}`);
});