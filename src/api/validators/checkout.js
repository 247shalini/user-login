import adminModel from "../models/adminModel.js";

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
                message:
                    "please create your account",
                error: error
            });
        }
        if (user.email === email && user.password === password) {
            req.session.userId = user._id;
            next();
        }
        if (user.password !== password) {
            return res.status(422).send("Your Password is Incorrect !!");
        }
        if (user.email !== email) {
            return res.status(422).send("Your Email is Incorrect !!");
        }

    } catch (error) {
        return res.status(422).send("User Details is Incorrect !!");
    }
} 
