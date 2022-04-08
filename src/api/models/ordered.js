import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    
    shippingAddress: { type: String, required: true },
    billingAddress: { type: String, required: true },

    purchaseItems: [
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
    ],
    totalAmount:{type:String ,required:true},
    paymentMode:{type:String ,enum:["cod","paypal"], default:"cod"}

});
export default mongoose.model("order", orderSchema);