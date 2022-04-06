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
    const newUser = await userModel.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
    });

    await newUser.save();
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
        return res.status(200).json({ 
            user_data: getData 
        });
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

/**
 * find email and create jwt token
 * @param { req, res }
 * @returns JsonResponse
 */
const emailVerify = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findOne({ _id: id });

        if (!user) {
            return res.status(422).json({
                errors: { message: message.USER_NOT_FOUND }
            });
        }
        
        const secret = process.env.JWT_SECRET + user.id;
        const payLoad = {
            id: user.id
        }
        const token = jwt.sign(payLoad, secret, { expiresIn: '5m' })
        const link = `${process.env.VERIFY_PATH}/${user.id}/${token}`
        console.log(link)

        return res.status(200).send(link);
    } catch (error) {
        return res.status(500).json({
            errors: { message: message.EMAIL_NOT_MATCH }
        });;
    }
}

/**
 * email verify using jwt token
 * @param { req, res }
 * @returns JsonResponse
 */
const emailVerifyAction = async (req, res) => {
    const { id, token } = req.params;
    const user = await userModel.findOne({ _id: id });

    // check if this id exist in database 
    if (id !== user.id) {
        return res.status(422).json(
            { message: message.USER_NOT_FOUND }
        );
    }

    // we have a valid id, and we have a valid user with this id
    const secret = process.env.JWT_SECRET + user.id
    try {
        const payLoad = jwt.verify(token, secret)
        return res.status(200).json(
            { message: message.VERIFY_SUCCESS }
        );

    } catch (error) {
        return res.status(500).json(
            { message: message.INVALID_TOKEN }
        );
    }
}

/** 
 * Update a profile image of user
 * @param { req, res }
 * @returns JsonResponse
 */
const userUploadFile = async (req, res) => {
    try {
        const { id } = req.params;
        const { file } = req;

        // find the id if user exist then update the profile image 
        await userModel.findOneAndUpdate({ _id: id }, { userProfileImage: file.filename } , { new: true })

        return res.status(200).json({
            message: message.USER_FILE_UPDATE_SUCCESS
        }); 

    } catch (error) {
        return res.status(500).json({
            message: message.USER_NOT_FOUND
        });
    }
};

const userController = {
    userRegister,
    userRegisterAction,
    userLogin,
    emailVerify,
    emailVerifyAction,
    userUploadFile
}

export default userController;