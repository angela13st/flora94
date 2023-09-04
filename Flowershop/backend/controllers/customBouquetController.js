import asyncHandler from 'express-async-handler';
import CustomBouquet from '../models/custombouquetModel.js';

// @desc    Create a new custom bouquet
// @route   POST /api/custombouquets
// @access  Public
const createCustomBouquet = asyncHandler(async (req, res) => {
  const { products } = req.body;
  
  const customBouquet = new CustomBouquet({
    products,
  });

  const createdCustomBouquet = await customBouquet.save();
  res.status(201).json(createdCustomBouquet);
});

// @desc    Get a custom bouquet by ID
// @route   GET /api/custombouquets/:id
// @access  Public
const getCustomBouquetById = asyncHandler(async (req, res) => {
  const customBouquet = await CustomBouquet.findById(req.params.id);

  if (customBouquet) {
    res.json(customBouquet);
  } else {
    res.status(404);
    throw new Error('Custom bouquet not found');
  }
});

// @desc    Add products and quantities to a custom bouquet
// @route   PUT /api/custombouquets/:id/addproducts
// @access  Public
const addProductsToCustomBouquet = asyncHandler(async (req, res) => {
    const { products } = req.body;
    const customBouquet = await CustomBouquet.findById(req.params.id);
  
    if (customBouquet) {
      customBouquet.products.push(...products);
      const updatedCustomBouquet = await customBouquet.save();
      res.json(updatedCustomBouquet);
    } else {
      res.status(404);
      throw new Error('Custom bouquet not found');
    }
  });
  
  export { createCustomBouquet, getCustomBouquetById, addProductsToCustomBouquet };
  
