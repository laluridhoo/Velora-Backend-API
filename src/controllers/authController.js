const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { errorResponse, successResponse } = require("../utils/responseHandler");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Validation
    if (!username || !email || !password || !fullName) {
      return errorResponse(res, 400, "All fields are required", "MISSING_FIELDS");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, 400, "User already exists", "USER_EXISTS");
    }

    const user = await User.create({ username, email, password, fullName });

    successResponse(res, 201, "User registered successfully", {
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        fullName: user.fullName,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("🚨 ERROR REGISTER:", error);
    errorResponse(res, 500, "Server error during registration", "SERVER_ERROR");
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return errorResponse(res, 400, "Email and password are required", "MISSING_FIELDS");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 401, "Invalid credentials", "INVALID_CREDENTIALS");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return errorResponse(res, 401, "Invalid credentials", "INVALID_CREDENTIALS");
    }

    successResponse(res, 200, "Login successful", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    errorResponse(res, 500, "Server error during login", "SERVER_ERROR");
  }
};
