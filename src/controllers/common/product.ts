import { Request, Response } from "express";
import productSchema, { Product } from "../../models/product.js";

import dotenv from "dotenv";
import Creates from "../../repositeries/common/create.js";
import Finds from "../../repositeries/common/find.js";
import { log } from "console";
dotenv.config();

interface imageRequest extends Request {
    images: any;
}
export class ProductClass {

    createService!: Creates
    findService!: Finds

    constructor() {
        this.createService = new Creates()
        this.findService = new Finds()
    }

    addProduct = async (req: any, res: Response) => {

        try {
            // console.log('reques in controller: ',req);
            debugger
            const { name, description, isAvailable, author, category } = req.body
            const image = req.images
            let imageData = []
            for (let index = 0; index < image.length; index++) {
                const element = image[index];
                imageData.push({ element })
            }
            const productData: Product = {
                name: name,
                description: description,
                category: category,
                isAvailable: isAvailable,
                image: image,
                author: author
            }
            const newProduct = await this.createService.create('product', productData, productSchema)
            res.status(200).json({ message: 'Product succesfully added', newProduct })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to create product" });
        }
    }

    editProduct = async (req: Request, res: Response) => {
        try {
            const productId = req.params.id;
            const productData = await this.findService.findById('product', productId, productSchema);

            const { name, description, isAvailable, author, category, image } = req.body;
            if (!productData) throw new Error('Product not found');

            productData.name = name;
            productData.description = description;
            productData.category = category;
            productData.isAvailable = isAvailable;
            productData.image = image;
            productData.author = author;

            const updateData = await productData.save();
            res.status(200).json({ updateData, message: 'Item succesfully updated' });

        } catch (error) {
            if (error instanceof Error) throw new Error(`Error on updating product : ${error.message}`);
            else throw new Error(`Error on updating product ${error}`);
        }
    }

    deleteProduct = async (res: Response, req: Request) => {
        try {

            const productId = req.params.id;
            const productData = await this.findService.findById('product', productId, productSchema);

            productData.image.forEach((data: any) => {
                console.log(data);
                const imageUrl = data;

                // Split the string based on '/' and get the last element
                const parts = imageUrl.split('/');
                const value = parts[parts.length - 1];

                console.log(value); // Output: 'sdbc2oaq3ttzrex2uiat'


            })

            await productData.deleteOne()

            res.status(200).json('Item succesfully deleted')

        } catch (error) {
            if (error instanceof Error) throw new Error(`Error on deleting product : ${error.message}`);
            else throw new Error(`Error on updating product ${error}`);
        }
    }

}