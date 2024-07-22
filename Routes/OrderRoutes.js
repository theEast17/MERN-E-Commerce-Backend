import express from 'express'
import { createOrder, deleteOrder, fetchAllOrder, fetchOrderByUser, updateOrder } from '../controller/Order.js'




const OrderRoutes = express.Router()


OrderRoutes.post('/',createOrder)
OrderRoutes.get('/user/:userId',fetchOrderByUser)
OrderRoutes.patch('/:id',updateOrder)
OrderRoutes.delete('/:id',deleteOrder)
OrderRoutes.get('/',fetchAllOrder)




export default OrderRoutes