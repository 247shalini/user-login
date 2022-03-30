import userModel from "../models/userModel.js";
import message from "../../common/message.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

/**
 * user registration code 
 * @param { req, res }
 * @returns JsonResponse
 */
const userRegister = async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    // save the data in database of user 
    await userModel.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
    });
    return res.status(200).json(
        { message: message.USER_REGISTRATION }
    );
}

/**
 * get the data of all register user 
 * @param { req, res }
 * @returns JsonResponse
 */
const userRegisterAction = async (req, res) => {
    try {
        // All data of user will show 
        const getData = await userModel.find();
        res.status(200).send(getData);
    } catch (error) {
        return res.status(422).json(
            {
                message: message.USER_NOT_REGISTERED
            });
    }
}

/**
 * login a user and generate JWT token
 * @param { req, res }
 * @returns JsonResponse
 */
export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res
            .status(422)
            .json({
                message: "Invalid request",
                errors: { message: message.PASSWORD_NOT_MATCH }
            });
    }

    // generate JWT token code
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "2h"
    });

    return res.status(200).json(
        { message: message.LOGIN_SUCCESS, token: token }
    );
}

const userController = {
    userRegister,
    userRegisterAction,
    userLogin,
}

export default userController;