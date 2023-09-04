import express from 'express';
import {
  createCustomBouquet,
  getCustomBouquetById,
  addProductsToCustomBouquet,
} from '../controllers/customBouquetController.js';

const router = express.Router();

// Routes for custom bouquets
router.route('/').post(createCustomBouquet);
router.route('/:id').get(getCustomBouquetById);
router.route('/:id/addproducts').put(addProductsToCustomBouquet); 

export default router;
