import mongoose from "mongoose";

const CartModel = new mongoose.Schema({
    quantity:{
        type: Number,
        required: true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
}, {
    timestamps: true
})

const virtual = CartModel.virtual('id')
virtual.get(function () {
    return this._id
})
CartModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


const CartSchema = mongoose.model('Cart', CartModel)

export default CartSchema