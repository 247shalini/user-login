import { Router } from "express";
import adminRouter from "./admin.js";
import userRouter from "./user.js";
import productRouter from "./product.js";
import categoryRouter from "./category.js";

const router = Router();

router.use("/admin", adminRouter);
router.use(productRouter);
router.use(categoryRouter);
router.use("/user", userRouter);

export default router;
