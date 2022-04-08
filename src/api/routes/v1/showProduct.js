import { Router } from "express";
import { showProductPage , productDetails } from "../../controllers/showProduct.js";

const showProduct = Router();

showProduct.get("/showproduct", showProductPage)
showProduct.get("/productdetails/:id", productDetails)

export default showProduct;