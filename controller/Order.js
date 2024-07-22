import OrderSchema from "../model/OrderModel.js"

export const fetchOrderByUser = async (req, res) => {
    const { userId } = req.params
    try {
        const orders = await OrderSchema.find({ user:userId })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createOrder = async (req, res) => {
    const data = req.body
    try {
        const order = await OrderSchema(data)
        const response = await order.save()
        res.status(201).json(response)
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

export const fetchAllOrder = async (req, res) => {

    let query = OrderSchema.find({});   //all the Orders 
    let totalOrdersQuery = OrderSchema.find({});  // all the Orders


    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
    }

    const totalDocs = await totalOrdersQuery.countDocuments().exec();

    if (req.query._page && req.query._limit) {
        const pageSize = parseInt(req.query._limit, 10);
        const page = parseInt(req.query._page, 10);
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const docs = await query.exec();
        res.set('X-Total-Count', totalDocs);
        res.status(200).json(docs);
    } catch (err) {
        res.status(400).json(err);
    }
};


export const fetchOrderById = async (req, res) => {
    const { id } = req.params
    try {
        const Order = await OrderSchema.findById(id)
        res.status(200).json(Order);
    } catch (err) {
        res.status(400).json(err);
    }
}