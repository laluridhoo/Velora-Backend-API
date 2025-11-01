require("dotenv").config();
console.log("JWT_SECRET =", process.env.JWT_SECRET);
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/db");

// Import routes
const authRoutes = require("./src/routers/authRoutes");
const carRoutes = require("./src/routers/carRoutes");
const rentalRoutes = require("./src/routers/rentalRoutes");

const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/cars", carRoutes);
// app.use("/api/rentals", rentalRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Velora Backend API is running" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
