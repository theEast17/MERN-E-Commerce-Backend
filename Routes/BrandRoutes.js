import express from 'express'
import { fethcAllBrands } from '../controller/Brands.js'


const BrandRoutes = express.Router()


BrandRoutes.get('/',fethcAllBrands)



export default BrandRoutes