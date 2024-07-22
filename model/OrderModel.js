import mongoose from "mongoose";

const OrderModel = new mongoose.Schema({
    items: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },
    totalAmount: {
        type: Number
    },
    totalItems: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    selectedPaymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    selectedAddress: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    }
}, {
    timestamps: true
})

const virtual = OrderModel.virtual('id')
virtual.get(function () {
    return this._id
})
OrderModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


const OrderSchema = mongoose.model('Order', OrderModel)

export default OrderSchema