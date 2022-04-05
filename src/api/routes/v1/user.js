import { Router } from "express";
import  userController  from "../../controllers/userAuth.js";
import { handleValidationErrors } from "../../middleware/handleValidation.js";
import  { userRegisterValidation }  from "../../validators/userValidate.js";
import { upload } from "../../middleware/profileImage.js";

const userRouter = Router();

userRouter.post("/userRegister", userRegisterValidation, handleValidationErrors , userController.userRegister)
userRouter.get("/userRegister", userController.userRegisterAction)

userRouter.get("/userlogin", userController.userLogin)

userRouter.post('/verify/:id',userController.emailVerify)
userRouter.get("/verify/:id/:token",userController.emailVerifyAction)

userRouter.post("/profileImage/:id", upload.single("file"), userController.userUploadFile);

export default userRouter;