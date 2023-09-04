import asyncHandler from 'express-async-handler';
import Restock from '../models/restockModel.js';

// @desc Create a new restock
// @route POST /api/restocks
// @access Public
const createRestock = asyncHandler(async (req, res) => {
  const { products } = req.body;

  const restock = new Restock({
    products,
  });

  const createdRestock = await restock.save();
  res.status(201).json(createdRestock);
});

// @desc Get all restocks
// @route GET /api/restocks
// @access Public
const getAllRestocks = asyncHandler(async (req, res) => {
  const restocks = await Restock.find({});
  res.json(restocks);
});

// @desc Get a restock by ID
// @route GET /api/restocks/:id
// @access Public
const getRestockById = asyncHandler(async (req, res) => {
  const restock = await Restock.findById(req.params.id);

  if (restock) {
    res.json(restock);
  } else {
    res.status(404);
    throw new Error('Restock not found');
  }
});

export { createRestock, getAllRestocks, getRestockById };
