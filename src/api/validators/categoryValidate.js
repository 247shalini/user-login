import { body } from "express-validator"

/**
 * category Validations
 * */

export const categoryValidation = [
    body("category").trim().notEmpty().withMessage("Enter a category name"),
];
