import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity:{
                type:Number,
                default:1
            },
            productPrice:{
                type:Number,
                required:true
            }

        }
    ]

});
export default mongoose.model("cart", cartSchema);