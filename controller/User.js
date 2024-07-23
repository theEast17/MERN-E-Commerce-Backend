import UserSchema from "../model/UserModel.js"
import crypto from 'crypto'
import jwt from 'jsonwebtoken'


const SECRET_KEY = 'secret'

export const createUser = async (req, res) => {
    const data = req.body
    const { email } = req.body
    try {
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ error: 'User already exists' });
        }
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
            const newUser = await UserSchema({ ...data, password: hashedPassword, salt })
            const response = await newUser.save()
            req.login(response, (err) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    const token = jwt.sign({ id: response.id , email:response.email }, SECRET_KEY)
                    res.status(201).json(token)
                }
            })
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const loginUser = async (req, res) => {
    res.json(req.user)
}

export const checkUser = async (req, res) => {
    res.json(req.user)
}

export const fetchUserbyId = async (req, res) => {
    const { id } = req.params
    try {
        const User = await UserSchema.findById(id)
        res.status(200).json(User)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const fetchAllUsers = async (req, res) => {
    try {
        const User = await UserSchema.find({})
        res.status(200).json(User)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const fetchUserByIdAndUpdate = async (req, res) => {
    const { id } = req.params
    const updatedData = req.body
    try {
        const User = await UserSchema.findByIdAndUpdate(id, updatedData, { new: true })
        res.status(200).json(User);
    } catch (err) {
        res.status(400).json(err);
    }
}