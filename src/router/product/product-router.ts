import { Router } from "express";
import { ProductClass } from "../../controllers/common/product.js"

import upload from '../../middlewares/multer/multer.js'
import uploadMultiple from "../../middlewares/cloudinary/uploadFile.js";

const product = new ProductClass();
 

const router = Router()

router.post('/create',upload.array("images"),uploadMultiple,product.addProduct)

router.put('/edit/:id',product.editProduct)

router.delete('/delete/:id',product.deleteProduct)

export default router