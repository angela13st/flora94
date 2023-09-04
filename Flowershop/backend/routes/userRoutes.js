import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
  getUsers,
  deleteUser,
  createUser,
  getEmployees,
  updateUserLoyaltyPoints
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createSchedule } from '../controllers/scheduleController.js';
import User from '../models/userModel.js';
//import { updateUser } from "../../frontend/src/actions/userActions.js";
router.post('/create-schedule', createSchedule);

//router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
/*router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUser);*/

//router.route("/:id").delete(protect, admin, deleteUser)  

router.route('/').get(getUsers);

router.route('/:id').delete(deleteUser);

router.route('/:id').put(updateUser)

router.route('/').post(createUser);

router.route('/employees').get(getEmployees)

router.route('/update-loyalty/:userId').put(updateUserLoyaltyPoints)

// Get user by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
