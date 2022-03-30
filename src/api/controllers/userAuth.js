import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

// admin registration code 
const userRegister = async (req, res) => {
    // const { firstname, lastname, email, password } = req.body
    // // save the data in database of user 
    // await userModel.create({
    //     firstname,
    //     lastname,
    //     email,
    //     password,
    // });
    return res.send("Successfully registered")
}

// get the data of user
const userRegisterAction = async (req, res) => {
    try {
        // find the data of user if its exist then data will show 
        const getData = await userModel.find();
        res.status(200).send(getData);
    } catch (error) {
        res.status(401).send(error);
    }
}

const userController = {
    userRegister,
    userRegisterAction,
    // userLogin,
    // userLoginAction,
    // userUpdate,
    // userDelete
}

export default userController;