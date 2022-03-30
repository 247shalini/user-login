import adminModel from "../models/adminModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

// admin registration code 
export const adminRegister = async (req, res) => {
    const { firstname, lastname, email, password, address, city, country, state } = req.body
    // save the data in database of admin 
    await adminModel.create({
        firstname,
        lastname,
        email,
        password,
        address,
        city,
        country,
        state,
    });
    return res.send("Successfully registered")
}

// get the data of admin user
export const adminRegisterAction = async (req, res) => {
    try {
        // find the data of admin if its exist then data will show 
        const getData = await adminModel.find();
        res.status(200).send(getData);
    } catch (error) {
        res.status(401).send(error);
    }
}

// admin login code
export const adminLogin = async (req, res) => {
    try {
        return res.send('Successfully login')
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                "please create your account",
            error: error
        });
    }
}

export const adminLoginAction = async (req, res) => {

    const { email } = req.body;
    const admin = await adminModel.findOne({ email });

    // create JWT token code
    const secret = `${process.env.JWT_SECRET}` + admin.password
    const payLoad = {
        email: admin.email,
        id: admin.id
    }
    const token = jwt.sign(payLoad, secret, { expiresIn: '5m' })
    const link = `${process.env.JWT_URL}/${admin.id}/${token}`

    return res.status(200).send(`Successfully login ${ link }`)
}

export const adminUpdate = async(req,res) => {
    try {
        const updateAdmin = await adminModel.findByIdAndUpdate(req.params.id , req.body , {
            new : true
    });
        res.status(200).send(updateAdmin);
    }catch(error){
        res.status(500).send(error);
    }
}

export const adminDelete = async(req, res) => {
    try {
        const Admin = await adminModel.findByIdAndDelete(req.params.id);
        res.status(200).send(`Admin data deleted successfully - ${Admin}`);
    }catch(error){
        res.status(500).send(error);
    }
}

// const AuthController = {
//     adminRegister,
//     adminRegisterAction,
//     adminLogin,
//     adminLoginAction,
//     adminUpdate,
//     adminDelete
// }

// export default AuthController;