import CartSchema from "../model/CartModel.js"

export const fetchCartByUser = async (req, res) => {
    const { user } = req.query
    try {
        const cartItem = await CartSchema.find({ user }).populate('product')
        res.status(200).json(cartItem)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const addToCart = async (req, res) => {
    const data = req.body
    try {
        const cartItem = await CartSchema(data)
        const response = await cartItem.save()
        const result = await response.populate('product')
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateCart = async (req, res) => {
    const { id } = req.params
    const updatedData = req.body
    try {
        const Cart = await CartSchema.findByIdAndUpdate(id, updatedData, { new: true })
        const result = await Cart.populate('product');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await CartSchema.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        res.status(200).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}