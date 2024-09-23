const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();



exports.registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({
        success: true,
        message: "User registered successfully" 
        });
  } catch (error) {
    res.status(500).json({success:false, message: "Error registering user", error });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      if (!email || !password) {
          return res.status(400).json({
              success: false,
              message: "Please fill in both email and password",
          });
      }

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }

      const token = jwt.sign(
          { userId: user._id, role: user.role }, 
          process.env.JWT_SECREAT, 
          { expiresIn: '3h' }
      );

      const userWithoutPassword = { ...user.toObject() }; 
      userWithoutPassword.token = token;
      delete userWithoutPassword.password; 

      res.status(200).json({
          success: true,
          message: 'Login successful',
          token,
          user: userWithoutPassword,
      });

  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Error logging in',
          error: error.message,
      });
  }
};

exports.updateUserProfile = async (req, res) => {
  const userId = req.user.userId;
  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

exports.deleteUserAccount = async (req, res) => {
  const userId = req.user.userId;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting account", error });
  }
};



exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; 
    // console.log(userId);

    const user = await User.findById(userId).select('-password');
    // console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
    });
  }
};



