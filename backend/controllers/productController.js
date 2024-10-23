import Product from '../models/productModel.js';

const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ message: 'Please fill all the inputs.' });
  }

  const productExists = await Product.findOne({ name });
  if (productExists) {
    res.status(400).json({ message: 'Product already exists' });
  }

  const newProduct = new Product({
    name,
    price,
    image,
  });

  try {
    await newProduct.save();

    res.status(201).json({
      newProduct,
    });
  } catch (error) {
    res.status(400);
    throw new Error('Invalid product data');
  }
};

const getAllProducts = async (req, res) => {
  let query = Product.find({}).sort({ createdAt: -1 }); // Sort by creation date in descending order

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);

  if (page > totalPages) {
    throw new Error('This page does not exist!');
  }

  const products = await query;
  res.json({
    currentPage: page,
    totalPages,
    totalProducts,
    products,
  });
};

export { createProduct, getAllProducts };
