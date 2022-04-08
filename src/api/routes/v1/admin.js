import { Router } from "express";
import  { adminLoginAction , adminRegister, adminData, adminDelete, adminUpdate, uploadFile, orderedList, orderedProduct }  from "../../controllers/adminAuth.js";
import { handleValidationErrors } from "../../middleware/handleValidation.js";
import  { adminRegisterValidation }  from "../../validators/validate.js";
import { checkout }  from "../../validators/checkout.js";
import { upload } from "../../middleware/profileImage.js";
import { tokenValidation } from "../../middleware/tokenValidation.js";
import { excelSheet, pdfFile } from "../../controllers/orderReport.js"

const adminRouter = Router();

adminRouter.post("/register", adminRegisterValidation, handleValidationErrors , adminRegister)
adminRouter.get("/data" , tokenValidation, adminData)

adminRouter.post("/login", checkout , adminLoginAction)

adminRouter.put("/:id" , tokenValidation, adminUpdate)
adminRouter.delete("/:id", adminDelete)

adminRouter.post("/profileImage", tokenValidation, upload.single("file"), uploadFile);

adminRouter.get("/orderlist" , tokenValidation, orderedList)
adminRouter.get("/orderproduct/:id", tokenValidation, orderedProduct)

adminRouter.get("/excelsheet", tokenValidation, excelSheet)
adminRouter.get("/pdffile", tokenValidation, pdfFile)

export default adminRouter;