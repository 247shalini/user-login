import { Router } from "express";
import {
  loginPage,
} from "../controllers/auth";

const authRouter = Router();

authRouter.get("/login", loginPage);

// authRouter.get("/signup", signupPage);
// authRouter.post("/signup", signupAction);

export default authRouter;