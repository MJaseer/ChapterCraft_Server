import { Router } from "express";
// import { ProductClass } from "/controllers/common/product.js";
import { ProductClass } from "../../controllers/common/product.js"

const product = new ProductClass();

const router = Router()

router.post('/add-product',product.addProduct)

router.put('/edit-product/:id',product.editProduct)

router.delete('/delete-product/:id',product.deleteProduct)

export default router