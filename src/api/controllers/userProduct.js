import message from "../../common/message.js";
import product from "../models/productModel.js";

/**  
 * get products code 
 * @param { req, res }
 * @returns JsonResponse
 */
const productPage = async (req, res) => {
    try {
        const { query: { categories, search = "", sort } } = req;
        let filter = {};

        if (categories) {
            filter = { category: categories.split(',') }
        }
        if (search) {
            filter["name"] = { $regex: search, $options: "i" };
        }

        let sortOrder = { salePrice: -1 }; // by default descending

        if (sort) {
            sortOrder = JSON.parse(sort);
        }
        // get product list according categorywise 
        const productList = await product
            .find(filter)
            .populate("name", { name: 1 })
            .sort(sortOrder)

        if (!productList) {
            return res.status(500).json({
                message: message.PRODUCTS_NOT_FOUND
            })
        }

        return res.status(200).json({
            message: message.PRODUCT_GET_SUCCESS,
            productList: productList
        });;

    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        });
    }
}

export default {
    productPage,
} 