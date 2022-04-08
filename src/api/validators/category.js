import { body } from "express-validator";

export const categoryValidate = [
    body("name").not().isEmpty().withMessage("Name of category is required"),
]