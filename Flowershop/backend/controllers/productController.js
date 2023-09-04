import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Create a new product
// @route   POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    description,
    countInStock,
    customBouquet,
  } = req.body;

  const product = new Product({
    name,
    price,
    image,
    brand,
    category,
    description,
    countInStock,
    customBouquet, 
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc  Fetch All Products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc  Fetch single Products
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Public/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, description, countInStock, customBouquet } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.countInStock = countInStock;
    product.customBouquet = customBouquet; // Update the customBouquet field

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(product)
  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Increase sold count for a product
// @route   PUT /api/products/:productId/increase-sold
// @access  Public (you may want to restrict this access)
const increaseProductSold = async (req, res) => {
  const productId = req.params.productId;
  const { qty } = req.body; // Extract the quantity from the request body

  try {
    // Find the product by its ID and increment the sold count using $inc
    const result = await Product.findByIdAndUpdate(productId, {
      $inc: { sold: qty },
    });

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Sold count updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



export { createProduct, getProductById, getProducts, updateProduct, deleteProduct, increaseProductSold };
