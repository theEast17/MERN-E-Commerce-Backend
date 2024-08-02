/* eslint-disable no-undef */
import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Buffer,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    addresses: {
        type: [mongoose.Schema.Types.Mixed]
    },
    name: {
        type: String
    },
    orders: {
        type: [mongoose.Schema.Types.Mixed]
    },
    salt: Buffer,
    resetPasswrodToken: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

const virtual = UserModel.virtual('id')
virtual.get(function () {
    return this._id
})
UserModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


const UserSchema = mongoose.model('User', UserModel)

export default UserSchema