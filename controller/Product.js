import ProductSchema from "../model/ProductModel.js"

export const createProduct = async (req, res) => {
    const data = req.body
    try {
        const newProduct = await ProductSchema(data)
        const response = await newProduct.save()
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const fetchAllProduct = async (req, res) => {

    let query = ProductSchema.find({});   //all the products 
    let totalProductsQuery = ProductSchema.find({});  // all the products


    if (req.query.category) {
        query = query.find({ category: { $in: req.query.category.split(',') } });
        totalProductsQuery = totalProductsQuery.find({ category: { $in: req.query.category.split(',') } });
    }

    if (req.query.brand) {
        query = query.find({ brand: { $in: req.query.brand.split(',') } });
        totalProductsQuery = totalProductsQuery.find({ brand: { $in: req.query.brand.split(',') } });
    }

    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
    }

    const totalDocs = await totalProductsQuery.countDocuments().exec();

    if (req.query._page && req.query._limit) {
        const pageSize = parseInt(req.query._limit, 10);
        const page = parseInt(req.query._page, 10);
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const docs = await query.exec();
        res.set('X-Total-Count', totalDocs);
        res.status(200).json(docs);
    } catch (err) {
        res.status(400).json(err);
    }
};


export const fetchProductById = async (req, res) => {
    const { id } = req.params
    try {
        const Product = await ProductSchema.findById(id)
        res.status(200).json(Product);
    } catch (err) {
        res.status(400).json(err);
    }
}

export const fetchProductByIdAndUpdate = async (req, res) => {
    const { id } = req.params
    const updatedData = req.body
    try {
        const Product = await ProductSchema.findByIdAndUpdate(id, updatedData, { new: true })
        res.status(200).json(Product);
    } catch (err) {
        res.status(400).json(err);
    }
}

