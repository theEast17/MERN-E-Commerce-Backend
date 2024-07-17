import mongoose from "mongoose";

const CategoryModel = new mongoose.Schema({
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

const virtual = CategoryModel.virtual('id')
virtual.get(function () {
    return this._id
})
CategoryModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


const CategorySchema = mongoose.model('Category', CategoryModel)

export default CategorySchema