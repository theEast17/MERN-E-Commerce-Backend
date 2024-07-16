import express from 'express'
import { createProduct, fetchAllProduct } from '../controller/Product.js'

const ProductRoutes = express.Router()


ProductRoutes.post('/',createProduct)
ProductRoutes.get('/',fetchAllProduct)


export default ProductRoutes