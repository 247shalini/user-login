import express from "express";
import cartController from "../../controllers/cart.js";

const cartRouter = express.Router();

cartRouter.post('/addtocart',cartController.cartAction)

export default cartRouter;
