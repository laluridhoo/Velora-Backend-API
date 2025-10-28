const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

module.exports = router;

// Jalankan di Node REPL dari root proyek:
// node -e "const c = require('./src/controllers/authController'); console.log('authController type', typeof c, Object.keys(c||{}));"
