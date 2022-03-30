import { body } from "express-validator"
import adminModel from "../models/adminModel.js";

/**
 * Admin Login Validations
 * */

export const adminRegisterValidation = [
    body("firstname").not().isEmpty().withMessage("First name is required"),
    body("lastname").not().isEmpty().withMessage("Last name is required"),
    body("email")
        .not()
        .isEmpty()
        .withMessage('Enter a email')
        .trim()
        .isEmail()
        .withMessage("Please enter valid email address.")
        .trim()
        .custom(async (value) => {
            const user = await adminModel.findOne({ email: value });
            if (user) {
              throw new Error("Email is already taken");
            }
        }),
    body("password")
        .trim().
        notEmpty()
        .withMessage('Enter password.').
        isStrongPassword({
            minLength: 5,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        })
        .withMessage("Password must be greater than 5 and contain at least one uppercase letter one lowercase letter and one number"),
    body("address").trim().notEmpty().withMessage("Address is required").isLength({min : 20}).withMessage("Enter a proper address"),
    body("city").trim().notEmpty().withMessage("Enter a city name"),
    body("country").trim().notEmpty().withMessage("Enter a country name"),
    body("state").trim().notEmpty().withMessage("Enter a state name"),
];
