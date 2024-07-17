import express from 'express'
import { createCategories, fethcAllCategories } from '../controller/Category.js'


const CategoryRoutes = express.Router()


CategoryRoutes.get('/',fethcAllCategories)
CategoryRoutes.post('/',createCategories)



export default CategoryRoutes