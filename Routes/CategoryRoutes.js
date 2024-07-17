import express from 'express'
import { fethcAllCategories } from '../controller/Category.js'


const CategoryRoutes = express.Router()


CategoryRoutes.get('/',fethcAllCategories)



export default CategoryRoutes