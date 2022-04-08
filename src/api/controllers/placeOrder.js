import message from "../../common/message.js"
import cart from "../models/cart.js"
import ordered from "../models/ordered.js";
import userModel from "../models/userModel.js";

/**  
 * order place code 
 * @param { req, res }
 * @returns JsonResponse
 */
const orderAction = async (req, res) => {
    try {
        const { user, billingAddress, shippingAddress } = req.body
        const userId = await userModel.findById({ _id: user })
        if (!userId) {
            return res.status(404).json({
                message: message.USER_NOT_FOUND
            })
        }
        const cartId = await cart.findOne({ user: user })
        if (!cartId) {
            return res.status(404).json({
                message: message.CART_PRODUCT_NOT_FOUND
            })
        }
        let totalAmount = 0;
        cartId.cartItems.map((value) => {
            return totalAmount += value.productPrice * value.quantity;
        })
        const placeOrder = await ordered.create({
            userId:cartId.user,
            shippingAddress,
            billingAddress,
            purchaseItems:cartId.cartItems,
            totalAmount:totalAmount
           
        })
        await cart.findByIdAndRemove(cartId)

        return res.status(200).json({
            message: message.PLACE_ORDER_SUCCESS,
            placeOrder:placeOrder
        })
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        })
    }
}

const orderController = {
    orderAction
}
export default orderController;