import express from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import asyncHandler from 'express-async-handler'
import { log } from 'console';

// configuration cloudinary
interface imageRequest extends Request {
    images: any;
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadMultiple = asyncHandler(async (req:any, res, next) => {
    try {
        const images: any = req.files
        console.log('images in 21 :',images);
        const imageUrls = []

        for (const image of images) {
            const result = await cloudinary.uploader.upload(image.path, {
                resource_type: "auto"
            })
            console.log(result);
            
            imageUrls.push(result.secure_url)
        }

        req.images = imageUrls;
        console.log('images in 33: ',req.images);

        //continuing to controller
        next()
        

    } catch (error) {
        console.log(error);
        res.status(500).json(`internal errorr at multiple.js : ${error}`)

    }
})

export default uploadMultiple