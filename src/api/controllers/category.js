import message from "../../common/message.js"
import categoryModel from "../models/categoryModel.js";

/** 
 * add a category 
 * @param { req, res }
 * @returns JsonResponse
 */
export const category = async (req, res) => {
    const { category } = req.body

    // save the product in database of productModel 
    await categoryModel.create({
        category,
    });

    return res.status(200).json(
        { message: message.CATEGORY_ADD_SUCCESS }
    );
}

export const categoryAction = async(req, res) => {
    try {
        // All category of user will show 
        const getcategory = await categoryModel.find();
        res.status(200).send(getcategory);
    } catch (error) {
        return res.status(500).json(
            {
                message: message.ERROR_MESSAGE
            });
    }
}