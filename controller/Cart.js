import CartSchema from "../model/CartModel.js"

export const fetchCartByUser=async(req,res)=>{
    const {user}=req.query
    try {
        const cartItem=await CartSchema.find({user}).populate('product')
        res.status(200).json({ cartItem })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const addToCart=async(req,res)=>{
    const data=req.body
    try {
        const cartItem = await CartSchema(data)
        const response = await cartItem.save()
        const result = await response.populate('product')
        res.status(201).json({ result })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}