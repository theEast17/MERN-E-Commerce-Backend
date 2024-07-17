import express from 'express'
import { addToCart, fetchCartByUser } from '../controller/Cart.js'



const CartRoutes = express.Router()


CartRoutes.post('/',addToCart)
CartRoutes.get('/',fetchCartByUser)




export default CartRoutes