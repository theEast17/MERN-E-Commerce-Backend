import mongoose from "mongoose";

const BrandModel = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        unique:true
    },
    label: {
        type: String,
        required: true,
        unique:true
    },
    checked: {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
})

const virtual = BrandModel.virtual('id')
virtual.get(function () {
    return this._id
})
BrandModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


const BrandSchema = mongoose.model('Brand', BrandModel)

export default BrandSchema