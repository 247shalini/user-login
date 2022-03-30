import adminModel from "../models/adminModel.js"

export const PaginatedData = async (req = {}) =>{

    let {page, size} = req.body

    if(!page){
        page = 1
    }

    if(!size){
        size = 5
    }

    const limit = parseInt(size);
    const skip = (page - 1) * size
    const results = {}
    try {
        results.results = await adminModel
            .find()
            .limit(limit).skip(skip).exec()
            console.log(results);
        return results
    } catch (e) {
        console.log(e)
    }
}