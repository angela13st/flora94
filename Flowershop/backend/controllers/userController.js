import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isEmployee: user.isEmployee,
      loyaltyPoints: user.loyaltyPoints,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc  Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  

  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isEmployee: user.isEmployee,
      loyaltyPoints: user.loyaltyPoints,
      token: generateToken(user._id),
    });
  }
  else{
    res.status(400)
    throw new Error("Invalid user data");
  }
});

// @desc  GET user profile
// @route GET /api/user/profile
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isEmployee: user.isEmployee,
      loyaltyPoints: user.loyaltyPoints,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});


// @desc  Update user information
// @route PUT /api/users/:id
// @access Public
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.isEmployee = req.body.isEmployee || user.isEmployee;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isEmployee: updatedUser.isEmployee,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc  Get a user by ID
// @route GET /api/users/:userId
// @access Public
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  
  const user = await User.findById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});



// @desc  Delete a user
// @route DELETE /api/users/:id
// @access Public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.status(200).json({ message: 'User deleted' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      loyaltyPoints: 0,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get list of employees
// @route   GET /api/users/employees
// @access  Public
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await User.find({ isEmployee: true });
  res.json(employees);
});


// @desc    Update user's loyalty points
// @route   PUT /api/users/update-loyalty/:userId
// @access  Public 
const updateUserLoyaltyPoints = async (req, res) => {
  const { userId } = req.params;
  const { pointsToAdd } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const parsedPoints = parseFloat(pointsToAdd);

    if (isNaN(parsedPoints)) {
      return res.status(400).json({ message: 'Invalid pointsToAdd value' });
    }

    user.loyaltyPoints += parsedPoints;


    await user.save();

    res.status(200).json({ message: 'Loyalty points updated successfully', user });
  } catch (error) {
    console.error('Error updating loyalty points:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




export {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
  getUsers,
  deleteUser,
  getUserById,
  createUser,
  getEmployees,
  updateUserLoyaltyPoints
};
