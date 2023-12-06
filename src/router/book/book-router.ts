import { Router } from "express";
import { BookClass } from "src/controllers/common/book";

const book = new BookClass();

const router = Router()

router.post('/add-book',book.addBook)

router.put('/edit-book/:id',book.editBook)

router.delete('/delete-book/:id',book.deleteBook)

export default router