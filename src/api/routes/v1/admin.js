import express from "express";
import  AuthController  from "../../controllers/adminAuth.js";
import { handleValidationErrors } from "../../middleware/adminValidation.js";
import  { adminRegisterValidation }  from "../../validators/validate.js";
import { checkout }  from "../../validators/checkout.js";

const router = express.Router();

router.post("/register", adminRegisterValidation,handleValidationErrors ,AuthController.adminRegister)
router.get("/register" ,AuthController.adminRegisterAction)

router.post("/login", checkout ,AuthController.adminLoginAction)
router.get("/login", AuthController.adminLogin)

router.put("/:id", AuthController.adminUpdate)
router.delete("/:id", AuthController.adminDelete)

export default router;