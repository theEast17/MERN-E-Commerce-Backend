import express from 'express'
import { createProduct, fetchAllProduct, fetchProductById } from '../controller/Product.js'

const ProductRoutes = express.Router()


ProductRoutes.post('/',createProduct)
ProductRoutes.get('/',fetchAllProduct)
ProductRoutes.get('/:id',fetchProductById)


export default ProductRoutes