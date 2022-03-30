import { body } from "express-validator"
import userModel from "../models/userModel.js";

/**
 * User Login Validations
 * */

export const userRegisterValidation = [
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
            const user = await userModel.findOne({ email: value });
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
   ];
