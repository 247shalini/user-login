import { Router } from "express";
import  userController  from "../../controllers/userAuth.js";
import { handleValidationErrors } from "../../middleware/adminValidation.js";
import  { userRegisterValidation }  from "../../validators/userValidate.js";
const userRouter = Router();

userRouter.post("/user" , userRegisterValidation, handleValidationErrors , userController.userRegister)
userRouter.get("/user" , userController.userRegisterAction)

// router.post("/userlogin", checkout ,AuthController.userLoginAction)
// router.get("/userlogin", AuthController.userLogin)

export default userRouter;