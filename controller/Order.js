import OrderSchema from "../model/OrderModel.js"

export const fetchOrderByUser = async (req, res) => {
    const { user } = req.query
    try {
        const orders = await OrderSchema.find({ user })
        res.status(200).json({ orders })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createOrder = async (req, res) => {
    const data = req.body
    try {
        const order = await OrderSchema(data)
        const response = await order.save()
        // const result = await response.populate('product')
        res.status(201).json({ response })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateOrder = async (req, res) => {
    const { id } = req.params
    const updatedData = req.body
    try {
        const order = await OrderSchema.findByIdAndUpdate(id, updatedData, { new: true })
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params
    try {
        await OrderSchema.findByIdAndDelete(id)
        res.status(200).json({ message: 'Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}