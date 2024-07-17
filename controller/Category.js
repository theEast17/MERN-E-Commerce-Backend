import CategorySchema from "../model/CategoryModel.js"

export const fethcAllCategories=async(req,res)=>{
    try {
        const categories=await CategorySchema.find({})
        res.status(200).json({ categories })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createCategories=async(req,res)=>{
    const data=req.body
    try {
        const newCategory = await CategorySchema(data)
        const response = await newCategory.save()
        res.status(201).json({ response })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}