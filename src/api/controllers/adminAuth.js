import adminModel from "../models/adminModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import message from "../../common/message.js"
import { PaginatedData } from "../middleware/pagination.js"
dotenv.config();

/** 
 * admin registration code 
 * @param { req, res }
 * @returns JsonResponse
 */
export const adminRegister = async (req, res) => {
    const { firstname, lastname, email, password, address, city} = req.body
    // save the data in database of admin 
    await adminModel.create({
        firstname,
        lastname,
        email,
        password,
        address,
        city,
    });
    return res.status(200).json(
        { message: message.USER_REGISTRATION }
    );
}

/** 
 * get the data of all register admin
 * @param { req, res }
 * @returns JsonResponse
 */
export const adminData = async (req, res) => {
    try {
            const adminUser = await PaginatedData(req)
            return res.status(200).json({
                data: adminUser,
            });
    } catch (error) {
        res.status(401).json({
            message: message.DATA_NOT_FOUND
        });
    }
}

/** 
 * login a admin and generate JWT token 
 * @param { req, res }
 * @returns JsonResponse
 */
export const adminLoginAction = async (req, res) => {

    const { email } = req.body;
    const admin = await adminModel.findOne({ email });

    // create JWT token code
    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET , {
        expiresIn: "2h"
    });

    return res.status(200).json({ 
        message: message.LOGIN_SUCCESS, 
        token: token 
    });
}  

export const adminDelete = async(req, res) => {
    try {
        const Admin = await adminModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: message.ADMIN_DATA_DELETED
        });
    }catch(error){
        res.status(401).json({
            message: message.ERROR_MESSAGE
        });
    }
}