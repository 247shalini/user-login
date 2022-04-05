import message from "../../common/message.js"
import product from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";

/** 
 * add a product 
 * @param { req, res }
 * @returns JsonResponse
 */
export const addProduct = async (req, res) => {
    const { productName, MRP, salePrice, description, category } = req.body
    const category_id = await categoryModel.findById(category)

    // if category_id exist then save the product in database of productModel 
    if (category_id) {
        await productModel.create({
            productName,
            MRP,
            salePrice,
            description,
            category,
        });
        return res.status(200).json(
            {
                message: message.PRODUCT_ADD_SUCCESS
            });
    }
    // if category_id not found 
    return res.status(404).json(
        {
            message: message.CATEGORY_NOT_FOUND
        });
}

/** 
 * get a product categorywise
 * @param { req, res }
 * @returns JsonResponse
 */
export const productAction = async (req, res) => {
    try {

        const { categories } = req.query
        let filter = {};

        if(categories) {
            filter = { category: categories.split(',') }
        }

        // categorywise data will show
        const productList = await product.findOne(filter).populate('category');

        if(!productList) {
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