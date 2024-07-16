import express from 'express'
import { createProduct } from '../controller/Product.js'

const ProductRoutes = express.Router()


ProductRoutes.post('/products',createProduct)


export default ProductRoutes