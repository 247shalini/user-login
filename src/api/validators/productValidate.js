import { body } from "express-validator"

/**
 * product Validations
 * */

export const productValidation = [
    body("productName").trim().notEmpty().withMessage("Enter a product name"),
    body("MRP").trim().notEmpty().withMessage("Enter a price of product"),
    body("salePrice").trim().notEmpty().withMessage("Enter a sale price of product"),
    body("description").trim().notEmpty().withMessage("Enter a description of product"),
];
