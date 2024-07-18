import express from 'express'
import { createOrder, deleteOrder, fetchOrderByUser, updateOrder } from '../controller/Order'




const OrderRoutes = express.Router()


OrderRoutes.post('/',createOrder)
OrderRoutes.get('/',fetchOrderByUser)
OrderRoutes.patch('/:id',updateOrder)
OrderRoutes.delete('/:id',deleteOrder)




export default OrderRoutes