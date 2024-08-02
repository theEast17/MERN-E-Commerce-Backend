import { invoiceTemplate, sendMail } from "../middleware/isAuth.js"
import OrderSchema from "../model/OrderModel.js"
import ProductSchema from "../model/ProductModel.js"
import UserSchema from "../model/UserModel.js"

export const fetchOrderByUser = async (req, res) => {
    const { id } = req.user
    try {
        const orders = await OrderSchema.find({ user: id })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createOrder = async (req, res) => {
    const data = req.body
    try {
        const order = await OrderSchema(data)
        for (let item of order.items) {
            await ProductSchema.findByIdAndUpdate(item.product.id, { $inc: { stock: item.quantity * -1 }})
        }
        const response = await order.save()
        const user = await UserSchema.findById(order.user)
        sendMail({ to: user.email, html: invoiceTemplate(order), subject: 'Thanks for your order!' })
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

    let query = OrderSchema.find({});   
    let totalOrdersQuery = OrderSchema.find({});  


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

// 