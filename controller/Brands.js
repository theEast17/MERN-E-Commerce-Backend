import BrandSchema from "../model/BrandModel.js"

export const fethcAllBrands=async(req,res)=>{
    try {
        const brands=await BrandSchema.find({})
        res.status(200).json({ brands })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}