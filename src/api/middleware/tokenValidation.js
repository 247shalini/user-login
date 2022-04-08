import adminModel from "../models/adminModel.js";
import { decode } from "../../helpers/encode_decode_jwt.js";
import message from "../../common/message.js"

/**
 * validate the token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const tokenValidation = async (req, res, next) => {
    try {
        const { headers: { authorization }, } = req;
        const token = authorization.split(" ")[1];
        const { id } = await decode(token);
        
        const adminDetails = await adminModel.findById(id)

        if (!adminDetails) {
            return res.status(500).json(
                {
                    message: message.AUTH_ERROR
                });
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                message: message.AUTH_ERROR
            });
    }
};
