import express from 'express'
import { checkUser, createUser, fetchAllUsers, fetchUserbyId, fetchUserByIdAndUpdate, loginUser } from '../controller/User.js'
import passport from 'passport'


const UserRoutes = express.Router()



UserRoutes.post('/signup', createUser)
UserRoutes.post('/login', passport.authenticate('local'), loginUser)
UserRoutes.get('/check', passport.authenticate('jwt', { session: false }), checkUser)
UserRoutes.get('/:id', fetchUserbyId)
UserRoutes.get('/', fetchAllUsers)
UserRoutes.patch('/:id', fetchUserByIdAndUpdate)




export default UserRoutes