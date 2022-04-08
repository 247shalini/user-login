import bcryptjs from "bcryptjs";
import message from "../../common/message.js"
import cart from "../models/cart.js"
import userModel from "../models/userModel.js";

/**  
 * product cart code 
 * @param { req, res }
 * @returns JsonResponse
 */
const cartAction = async (req, res) => {
    try {
        const { cartItems, user } = req.body
        const userId = await userModel.findById(user);
        if (!userId) {
            //if user is not exist
            // create a guest user  
            const userIds = await userModel.create({
                firstName: "Guest",
                lastName: "User",
                email: "Guest@gmail.com",
                password: bcryptjs.hashSync("password", 10),
            });
            // Create a cart for a  guest user
            const cartItem = await cart.create({
                user: userIds,
                cartItems: [cartItems]
            })
            return res.status(200).json({
                message: message.PRODUCT_SUCCESS,
                additem: cartItem
            });
        }


        //if user exist 
        const existCart = await cart.findOne({ user: userId._id })

        //  user cart already available
        if (existCart) {
            try {
                //if product already exist in user cart
                const isProductExist = await cart.findOne({ cartItems: { $elemMatch: { productId: cartItems.productId } } })
                if (isProductExist) {
                    let productQuantity
                    isProductExist.cartItems.map((data) => productQuantity = data.quantity)
                    const updateExistProduct = await cart.findOneAndUpdate
                        ({ "user": userId.id },
                            {
                                "$set": {
                                    "cartItems": {
                                        ...cartItems,
                                        quantity: productQuantity + cartItems.quantity
                                    }
                                }
                            }
                            , { new: true })
                    console.log("updateExistProduct",)
                    return res.status(200).json({
                        message: message.PRODUCT_SUCCESS,
                        cart: updateExistProduct
                    });
                } else {
                    //if product not exist in user cart
                    const updateExistCart = await cart.findOneAndUpdate
                        ({ user: userId.id },
                            { "$push": { "cartItems": cartItems } }, { new: true })
                    return res.status(200).json({
                        message: message.PRODUCT_SUCCESS,
                        cart: updateExistCart
                    });
                }
            } catch (error) {
                return res.status(500).json({
                    message: message.ERROR_MESSAGE
                });
            }
        }
        else {
            // if user cart not available
            const cartItem = await cart.create({
                user: user,
                cartItems: [cartItems]
            })
            return res.status(200).json({
                message: message.PRODUCT_SUCCESS,
                additem: cartItem
            });
        }


    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        });
    }
}
const cartController = {
    cartAction
}
export default cartController;