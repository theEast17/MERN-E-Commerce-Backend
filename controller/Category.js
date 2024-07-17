import CategorySchema from "../model/CategoryModel.js"

export const fethcAllCategories=async(req,res)=>{
    try {
        const categories=await CategorySchema.find({})
        res.status(200).json({ categories })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}