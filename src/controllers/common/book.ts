import { Request, Response } from "express";
import bookSchema, { Book } from "../../models/book";

import dotenv from "dotenv";
import { Creates } from "../../repositeries/common/create.js";
import { Finds } from "src/repositeries/common/find";
dotenv.config();

export class BookClass {

    private createService!: Creates
    private findService!: Finds

    constructor() {
        this.createService = new Creates()
        this.findService = new Finds()
    }

    addBook = async (req: Request, res: Response) => {

        try {
            const { name, description, isAvailable, author, category, image } = req.body
            const bookData: Book = {
                name: name,
                description: description,
                category: category,
                isAvailable: isAvailable,
                image: image,
                author: author
            }
            const newBook = await this.createService.create('book', bookData, bookSchema)
            res.status(200).json({ message: 'Book succesfully added', newBook })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to create product" });
        }
    }

    editBook = async (req: Request, res: Response) => {
        try {
            const bookId = req.params.id;
            const bookData = await this.findService.findById('book', bookId, bookSchema);

            const { name, description, isAvailable, author, category, image } = req.body;
            if (!bookData) throw new Error('Book not found');

            bookData.name = name;
            bookData.description = description;
            bookData.category = category;
            bookData.isAvailable = isAvailable;
            bookData.image = image;
            bookData.author = author;

            const updateData = await bookData.save();
            res.status(200).json({ updateData, message: 'Item succesfully updated' });

        } catch (error) {
            if (error instanceof Error) throw new Error(`Error on updating book : ${error.message}`);
            else throw new Error(`Error on updating book ${error}`);
        }
    }

    deleteBook = async (res: Response, req: Request) => {
        try {

            const bookId = req.params.id;
            const bookData = await this.findService.findById('book', bookId, bookSchema);

            await bookData.deleteOne()

            res.status(200).json('Item succesfully deleted')

        } catch (error) {
            if (error instanceof Error) throw new Error(`Error on deleting book : ${error.message}`);
            else throw new Error(`Error on updating book ${error}`);
        }
    }

}