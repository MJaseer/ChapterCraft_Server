import { Router } from "express";
import AdminClass from "../../  ../../controllers/admin/admin";
// import { validation } from "../../middlewares/validation/yup.js";

const admin = new AdminClass();

// const validator = new validation()

const router = Router()

// router.post('/register',admin)

// router.post('/login',admin.userLogin)
// not finished
// router.put('/edit-profile',user.updateProfile)


export default router