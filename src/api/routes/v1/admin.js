import { Router } from "express";
import  { adminLogin , adminLoginAction , adminRegister, adminRegisterAction, adminDelete , adminUpdate}  from "../../controllers/adminAuth.js";
import { handleValidationErrors } from "../../middleware/adminValidation.js";
import  { adminRegisterValidation }  from "../../validators/validate.js";
import { checkout }  from "../../validators/checkout.js";

const adminRouter = Router();

adminRouter.post("/register", adminRegisterValidation,handleValidationErrors , adminRegister)
adminRouter.get("/register" , adminRegisterAction)

adminRouter.post("/login", checkout , adminLoginAction)
adminRouter.get("/login", adminLogin)

adminRouter.put("/:id", adminUpdate)
adminRouter.delete("/:id", adminDelete)

export default adminRouter;