import UserSchema from "../model/UserModel.js"
import crypto from 'crypto'
import jwt from 'jsonwebtoken'


const SECRET_KEY = 'secret'

export const createUser = async (req, res) => {
    const { email } = req.body
    try {
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ error: 'User already exists' });
        }
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
            const newUser = await UserSchema({ ...req.body, password: hashedPassword, salt })
            const response = await newUser.save()
            req.login(response, (err) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    const token = jwt.sign({ id: response.id, email: response.email }, SECRET_KEY)
                    res.cookie('jwt', token, {
                        expires: new Date(Date.now() + 3600000),
                        httpOnly: true
                    }).status(201).json({ id: response.id, email: response.email, role: response.role, addresses: response.addresses })
                }
            })
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const loginUser = async (req, res) => {
    res.cookie('jwt', req.user.token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true
    }).status(201).json({ id: req.user.id, role: req.user.role })
}

export const checkUser = async (req, res) => {
    if (req.user) {
        res.json({ status: 'success', user: req.user });
    } else {
        res.status(401).json('User not found!')
    }
}

export const fetchUserbyId = async (req, res) => {
    const { id } = req.user
    try {
        const User = await UserSchema.findById(id)
        res.status(200).json({ id: User.id, addresses: User.addresses, email: User.email, role: User.role })
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