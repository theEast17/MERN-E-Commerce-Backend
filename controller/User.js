import UserSchema from "../model/UserModel.js"

export const createUser = async (req, res) => {
    const data = req.body
    const { email } = req.body
    try {
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }
        const newUser = await UserSchema(data)
        const response = await newUser.save()
        res.status(201).json({ response })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const User = await UserSchema.findOne({ email });
        if (!User) {
            return res.status(401).json({ error: 'User Not Exists' });
        }
        if (User.password === password) {
            res.status(200).json({ id: User.id, email: User.email, role: User.role, addresses: User.addresses })
        } else {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const fetchUserbyId = async (req, res) => {
    const { id } = req.params
    try {
        const User = await UserSchema.findById(id, 'name email id')
        res.status(200).json({ User })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const fetchAllUsers = async (req, res) => {
    try {
        const User = await UserSchema.find({})
        res.status(200).json({ User })
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