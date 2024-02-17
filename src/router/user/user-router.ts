import { Router } from "express";
import UserClass from "../../  ../../controllers/user/user.js";
// import { validation } from "../../middlewares/validation/yup.js";

const user = new UserClass();

// const validator = new validation()

const router = Router()

router.post('/register',user.userRegister)

router.post('/login',user.userLogin)
// not finished
router.put('/edit-profile',user.updateProfile)


export default router