import express from 'express'
import { checkAuth, createUser, fetchAllUsers, fetchUserbyId, fetchUserByIdAndUpdate, loginUser, logoutUser, resetPassword, resetPasswordRequest } from '../controller/User.js'
import passport from 'passport'
import { isAuth } from '../middleware/isAuth.js'


const UserRoutes = express.Router()



UserRoutes.post('/signup', createUser)
UserRoutes.post('/login', passport.authenticate('local'), loginUser)
UserRoutes.get('/logout', logoutUser)
UserRoutes.post('/reset-password-request',resetPasswordRequest)
UserRoutes.post('/reset-password',resetPassword)
UserRoutes.get('/check', passport.authenticate('jwt'), checkAuth)
UserRoutes.get('/own', isAuth(), fetchUserbyId)
UserRoutes.get('/', fetchAllUsers)
UserRoutes.patch('/:id', isAuth(), fetchUserByIdAndUpdate)




export default UserRoutes