import express from 'express'
import { createProduct, fetchAllProduct, fetchProductById, fetchProductByIdAndUpdate } from '../controller/Product.js'

const ProductRoutes = express.Router()


ProductRoutes.post('/',createProduct)
ProductRoutes.get('/',fetchAllProduct)
ProductRoutes.get('/:id',fetchProductById)
ProductRoutes.patch('/:id',fetchProductByIdAndUpdate)


export default ProductRoutes