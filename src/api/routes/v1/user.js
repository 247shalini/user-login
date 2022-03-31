import { Router } from "express";
import  userController  from "../../controllers/userAuth.js";
import { handleValidationErrors } from "../../middleware/adminValidation.js";
import  { userRegisterValidation }  from "../../validators/userValidate.js";
const userRouter = Router();

userRouter.post("/user", userRegisterValidation, handleValidationErrors , userController.userRegister)
userRouter.get("/user", userController.userRegisterAction)

userRouter.get("/userlogin", userController.userLogin)
userRouter.post('/verify/:id',userController.emailVerify)

userRouter.get("/verify/:id/:token",userController.emailVerifyAction)
export default userRouter;