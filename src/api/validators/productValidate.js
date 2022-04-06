import { body } from "express-validator"
import productModel from "../models/productModel.js";

/**
 * product Validations
 * */

export const productValidation = [
    body("productName").not().isEmpty().withMessage("Enter a product name")
    .custom(async (value) => {
        const product = await productModel.findOne({ productName: value });
        if (product) {
          throw new Error("Product name is already taken");
        }
    }),
    body("MRP").not().isEmpty().withMessage("Enter a price of product"),
    body("salePrice").not().isEmpty().withMessage("Enter a sale price of product"),
    body("description").not().isEmpty().withMessage("Enter a description of product"),
    body("category").not().isEmpty().withMessage("Enter a category id")
    // body("image").trim().notEmpty().withMessage("Select a image"),
];