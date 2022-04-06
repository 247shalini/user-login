import { Router } from "express";
import { showProductPage } from "../../controllers/showProduct.js";

const showProduct = Router();

showProduct.get("/showproduct", showProductPage)

export default showProduct;