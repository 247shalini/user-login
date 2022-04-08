import adminModel from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import message from "../../common/message.js";

/**
 * checkout admin email and password exist or not
 * */
export const checkout = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        const user = await adminModel.findOne({ email });
        if (!user) {
            return res.status(422).json({
                success: false,
                message:message.CREATE_ACCOUNT,
                error: error
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            next();
        }
      
        if (user.email !== email) {
            return res.status(422).json({
                message: message.EMAIL_NOT_MATCH
            });
        }

    } catch (error) {
        return res.status(422).json({
            message: message.USER_DETAILS_INCORRECT
        });
    }
} 
