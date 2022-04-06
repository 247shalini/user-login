import admin from "../models/adminModel.js";
import dotenv from "dotenv";
import { decode, encode } from '../../helpers/encode_decode_jwt.js';
import message from "../../common/message.js";
import { PaginatedData } from "../middleware/pagination.js";
import adminModel from "../models/adminModel.js";
dotenv.config();

/** 
 * admin registration code 
 * @param { req, res }
 * @returns JsonResponse
 */
export const adminRegister = async (req, res) => {
    const { firstname, lastname, email, password, address, city} = req.body

    // save the data in database of admin 
    await admin.create({
        firstname,
        lastname,
        email,
        password,
        address,
        city,
    });
    return res.status(200).json(
        { message: message.ADMIN_REGISTRATION }
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
    // console.log(req.body)

    return res.status(200).json({ 
        message: message.LOGIN_SUCCESS, 
        token: `${await encode({
            id: admin._id,
          })}`, 
    });
}  

/** 
 * update a admin user
 * @param { req, res }
 * @returns JsonResponse
 */
 export const adminUpdate = async(req, res) => {
    try {
        const updateAdmin = await admin.findByIdAndUpdate(req.params.id , req.body , {
            new : true
        })
        return res.status(200).json({
            message: message.ADMIN_DATA_UPDATE
        });
    }catch(error){
        res.status(401).json({
            message: message.ERROR_MESSAGE
        });
    }
}

/** 
 * delete a admin data
 * @param { req, res }
 * @returns JsonResponse
 */
export const adminDelete = async(req, res) => {
    try {

        // find the id if user exist then delete the data of admin
        const Admin = await admin.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: message.ADMIN_DATA_DELETED
        });
    }catch(error){
        res.status(401).json({
            message: message.ERROR_MESSAGE
        });
    }
}

/** 
 * Update a profile image of admin
 * @param { req, res }
 * @returns JsonResponse
 */
export const uploadFile = async (req, res) => {
    try {
        const { headers: { authorization } } = req;
        
        if (!authorization) {
            return res.status(404).json({
              message: message.AUTH_ERROR,
            })
        }

        const token = authorization.split(" ")[1];
        const { id } = await decode(token);
        const { file } = req;

        // find the id if admin exist then update the profile image of admin
        await admin.findOneAndUpdate({ _id: id }, { $set: { profileImage: file.filename } } , { new: true })

        return res.status(200).json({
            profileImage: req.file.filename,
            message: message.ADMIN_FILE_UPDATE_SUCCESS
        }); 

    } catch (error) {
        return res.status(500).json({
            message: message.INVALID_TOKEN
        });
    }
};