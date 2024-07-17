import express from 'express'
import { createUser, fetchAllUsers, fetchUserbyId, fetchUserByIdAndUpdate, loginUser } from '../controller/User.js'


const UserRoutes = express.Router()



UserRoutes.post('/signup',createUser)
UserRoutes.post('/login',loginUser)
UserRoutes.get('/:id',fetchUserbyId)
UserRoutes.get('/',fetchAllUsers)
UserRoutes.patch('/:id',fetchUserByIdAndUpdate)




export default UserRoutes