import BrandSchema from "../model/BrandModel.js"

export const fethcAllBrands=async(req,res)=>{
    try {
        const brands=await BrandSchema.find({})
        res.status(200).json({ brands })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createBrands=async(req,res)=>{
    const data=req.body
    try {
        const newBrand = await BrandSchema(data)
        const response = await newBrand.save()
        res.status(201).json({ response })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}