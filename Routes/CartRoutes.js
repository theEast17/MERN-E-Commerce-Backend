import express from 'express'
import { addToCart, deleteFromCart, fetchCartByUser, updateCart } from '../controller/Cart.js'



const CartRoutes = express.Router()


CartRoutes.post('/',addToCart)
CartRoutes.get('/',fetchCartByUser)
CartRoutes.patch('/:id',updateCart)
CartRoutes.delete('/:id',deleteFromCart)




export default CartRoutes