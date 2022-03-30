import express from "express";
import  userController  from "../../controllers/userAuth.js";

const router = express.Router();

router.post("/user" , userController.userRegister)
router.get("/user" , userController.userRegisterAction)

// router.post("/userlogin", checkout ,AuthController.userLoginAction)
// router.get("/userlogin", AuthController.userLogin)

// router.put("/:id", AuthController.adminUpdate)
// router.delete("/:id", AuthController.adminDelete)

export default router;