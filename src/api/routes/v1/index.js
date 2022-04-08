import { Router } from "express";
import adminRouter from "./admin.js";
import userRouter from "./user.js";
import productRouter from "./product.js";
import categoryRouter from "./category.js";
import showProduct from "./showProduct.js";
import userProductRouter from "./userProduct.js";
import cartRouter from "./cart.js";

const router = Router();

router.use("/admin", adminRouter);
router.use(productRouter);
router.use(categoryRouter);
router.use("/user", userRouter);
router.use("/user", showProduct);
router.use('/user', userProductRouter);
router.use('/user', cartRouter);

export default router;
