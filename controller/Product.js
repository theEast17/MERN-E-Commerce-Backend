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

    // req.params: Contains route parameters (in the path portion of the URL) as key-value pairs.
    // req.query: Contains the URL query string parameters as key-value pairs.
    // req.body: Contains the parsed body of the request (for example, form data or JSON).
    // req.headers: Contains the headers sent by the client.
    // req.method: Contains the HTTP method of the request (e.g., GET, POST).
    // req.url: Contains the full URL of the request.
    // req.path: Contains the path portion of the URL.

    let query = ProductSchema.find({});   //all the products 
    let totalProductsQuery = ProductSchema.find({});  // all the products


    if (req.query.category) {
        query = query.find({ category: req.query.category });
        totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
    }

    if (req.query.brand) {
        query = query.find({ brand: req.query.brand });
        totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
    }

    if (req.query._sort && req.query._order) {
        // The square brackets are used in this context to dynamically set the property name of an object.
        // This is a feature called computed property names in JavaScript, which allows you to use an expression to determine the property name.

        // Dynamic Property Names:

        // When you write { [req.query._sort]: req.query._order }, it dynamically creates an object where the key is the value of req.query._sort and the value is the value of req.query._order.
        // This is useful because the sort field (req.query._sort) is not known until runtime. It could be any field in your schema, like price, name, rating, etc.
        // Without Computed Property Names:

        // If you were to write it without the square brackets, like { req.query._sort: req.query._order }, JavaScript would interpret req.query._sort as a literal string key, which is not what you want.

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

