import express from 'express';
import asyncHandler from 'express-async-handler';
import { createSchedule, getUserSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

router.route('/').post(createSchedule);
router.route('/:userId').get(getUserSchedule);

export default router;
