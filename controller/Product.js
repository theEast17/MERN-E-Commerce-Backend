import ProductSchema from "../model/ProductModel.js"

export const createProduct = async (req, res) => {
    const data = req.body
    try {
        const newProduct = await ProductSchema(data)
        const response = await newProduct.save()
        res.status(201).json({  response })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}