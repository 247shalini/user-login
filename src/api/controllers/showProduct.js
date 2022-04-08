import message from "../../common/message.js"
import productModel from "../models/productModel.js";
import product from "../models/productModel.js";

/** 
 * show product to user use filter, searching and pagination
 * @param { req, res }
 * @returns JsonResponse
 */
export const showProductPage = async (req, res) => {
    try {

        const { size = 10, page = 1, categories, search = "", sort, rating, low = "", high = "" } = req.query

        let condition = {};

        //search product name 
        if (search) {
            condition["productName"] = { $regex: search, $options: "i" };
        }

        //descending order
        let sortOrder = { productName: -1 };

        if (sort) {
            sortOrder = JSON.parse(sort);
        }

        if (categories) {
            condition = { category: categories.split(',') }
        }

        if (low, high) {
            condition["salePrice"] = { $gte: parseInt(low), $lte: parseInt(high) }
        }

        if (rating) {
            condition = { rating: rating.split(',') }
        }

        // condition wise product will show
        const productList = await product.find(condition)
            .populate("category", { category: 1 })
            .sort(sortOrder)
            .limit(size)
            .skip(size * (page - 1));

        const totalItems = await product.countDocuments(condition);

        // if product is not available 
        if (!productList) {
            return res.status(404).json({
                message: message.NO_PRODUCTS_FOUND,
            })
        }

        return res.status(200).json({
            data: productList,
            totalItems,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        })
    }
}

export const productDetails = async (req, res) => {
    try {
        const { id } = req.params;

        // show particular details of product
        const product = await productModel.findOne({ _id: id });

        if (!product) {
            return res.status(422).json({
                errors: { message: message.PRODUCT_NOT_FOUND }
            });
        }
        return res.status(200).json({
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        })
    }
}