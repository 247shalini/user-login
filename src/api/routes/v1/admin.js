import { Router } from "express";
import  { adminLoginAction , adminRegister, adminData, adminDelete, adminUpdate, uploadFile }  from "../../controllers/adminAuth.js";
import { handleValidationErrors } from "../../middleware/handleValidation.js";
import  { adminRegisterValidation }  from "../../validators/validate.js";
import { checkout }  from "../../validators/checkout.js";
import { upload } from "../../middleware/profileImage.js";

const adminRouter = Router();

adminRouter.post("/register", adminRegisterValidation, handleValidationErrors , adminRegister)
adminRouter.get("/data" , adminData)

adminRouter.post("/login", checkout , adminLoginAction)

adminRouter.put("/:id" , adminUpdate)
adminRouter.delete("/:id", adminDelete)

adminRouter.post("/profileImage/:id", upload.single("file"), uploadFile);

export default adminRouter;