import { param } from "express-validator";

export const productValidate = [
    param('name').not().isEmpty().withMessage("Name of product is required"),
    param("description").not().isEmpty().withMessage("Description of product is required"),
    param("salePrice").not().isEmpty().withMessage("SalePrice of product is required"),
    param("mrp").not().isEmpty().withMessage("Mrp of product is required"),
    param("category").not().isEmpty().withMessage("Category of product is required"),
    param("productImage").not().isEmpty().withMessage("Image of product is required"),
]
