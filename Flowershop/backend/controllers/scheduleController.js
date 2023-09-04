import asyncHandler from 'express-async-handler';
import Schedule from '../models/scheduleModel.js';

// @desc  Add new shift
// @route POST /api/schedules
// @access Public
const createSchedule = asyncHandler(async (req, res) => {
  const { userId, date, shift, task } = req.body;

  try {
    const schedule = new Schedule({
      employee:userId,
      date,
      shift,
      task,
    });

    const createdSchedule = await schedule.save();
    res.status(201).json(createdSchedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// @desc Fetch user's schedule by userId
// @route GET /api/schedule/:userId
// @access Public 
const getUserSchedule = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const userSchedule = await Schedule.find({ employee: userId }); 

  if (userSchedule) {
    res.json(userSchedule);
  } else {
    res.status(404);
    throw new Error('User schedule not found');
  }
});

export { createSchedule, getUserSchedule };
