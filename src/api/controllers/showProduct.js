import message from "../../common/message.js"
import product from "../models/productModel.js";

/** 
 * get a product categorywise
 * @param { req, res }
 * @returns JsonResponse
 */
 export const showProductPage = async (req, res) => {
    try {

        const { categories, size = 10, page = 1, search = "", type, sort } = req.query

        let condition = {};

        if (categories) {
            condition = { category: categories.split(',') }
        }

        if (search) {
            condition["productName"] = { $regex: search, $options: "i" };
        }
      
        //descending order
        let sortOrder = { createdAt: -1 };
      
        if (sort) {
            sortOrder = JSON.parse(sort);
        }

        // categorywise data will show
        const productList = await product.find(condition).populate('category');

        if (!productList) {
            return res.status(404).json({
                message: message.NO_PRODUCTS_FOUND
            })
        }

        return res.status(200).send(productList);
    } catch (error) {
        return res.status(500).json(
            {
                message: message.ERROR_MESSAGE
            });
    }
}