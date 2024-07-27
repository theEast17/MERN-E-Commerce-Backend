import express from 'express'
import { checkUser, createUser, fetchAllUsers, fetchUserbyId, fetchUserByIdAndUpdate, loginUser } from '../controller/User.js'
import passport from 'passport'
import { isAuth } from '../middleware/isAuth.js'


const UserRoutes = express.Router()



UserRoutes.post('/signup', createUser)
UserRoutes.post('/login', passport.authenticate('local'), loginUser)
UserRoutes.get('/check', passport.authenticate('jwt'), checkUser)
UserRoutes.get('/own', isAuth(), fetchUserbyId)
UserRoutes.get('/', fetchAllUsers)
UserRoutes.patch('/:id', isAuth(), fetchUserByIdAndUpdate)




export default UserRoutes