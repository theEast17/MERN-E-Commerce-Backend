import ProductSchema from "../model/ProductModel.js"

export const createProduct = async (req, res) => {
    const data = req.body
    try {
        const newProduct = await ProductSchema(data)
        const response = await newProduct.save()
        res.status(201).json({  response })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const fetchAllProduct = async (req, res) => {
    let query = ProductSchema.find({});
    let totalProductsQuery = ProductSchema.find({});
  
    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
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
  