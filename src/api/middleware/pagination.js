import adminModel from "../models/adminModel.js"

export const PaginatedData = async (req = {}) => {

    let { page, size } = req.query

    if (!page) {
        page = 1
    }

    if (!size) {
        size = 5
    }

    const limit = parseInt(size);
    const skip = (page - 1) * size
    const results = {}
    try {
        results.results = await adminModel
            .find()
            .limit(limit)
            .skip(skip)
            .exec()
        return results
    } catch (error) {
        return res.status(401).json({
            message: message.DATA_NOT_FOUND
        });
    }
}