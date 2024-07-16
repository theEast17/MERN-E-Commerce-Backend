import mongoose from "mongoose";

const ProductModel = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: [1, 'wrong minimum price'],
        max: [100000, 'wrong maximum price'],
        required: true
    },
    discountPercentage: {
        type: Number,
        min: [1, 'wrong minimum discount'],
        max: [99, 'wrong maximum discount'],
        required: true
    },
    rating: {
        type: Number,
        min: [0, 'wrong minimum rating'],
        max: [5, 'wrong maximum rating'],
        default: 0,
    },
    stock: {
        type: Number,
        min: [0, 'wrong minimum stock'],
        default: 0
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const virtual = ProductModel.virtual('id')
virtual.get(function () {
    return this._id
})
ProductModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


const ProductSchema = mongoose.model('Product', ProductModel)

export default ProductSchema