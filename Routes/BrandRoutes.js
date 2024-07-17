import express from 'express'
import { createBrands, fethcAllBrands } from '../controller/Brands.js'


const BrandRoutes = express.Router()


BrandRoutes.get('/',fethcAllBrands)
BrandRoutes.post('/',createBrands)




export default BrandRoutes