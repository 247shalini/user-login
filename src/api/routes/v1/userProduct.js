import express from "express";
import orderController from "../../controllers/placeOrder.js";
import userProduct from "../../controllers/userProduct.js";

const userProductRouter = express.Router();

userProductRouter.get('/product',userProduct.productPage)
userProductRouter.post('/purchase',orderController.orderAction)

export default userProductRouter ;
