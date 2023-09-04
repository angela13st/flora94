import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  createRestock,
  getAllRestocks,
  getRestockById,
} from '../controllers/restockController.js';

const router = express.Router();

router.route('/').post(createRestock);
router.route('/').get(getAllRestocks);
router.route('/:id').get(getRestockById);

export default router;
