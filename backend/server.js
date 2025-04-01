const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");         
const recipeRoutes = require("./routes/recipeRoutes");    
const errorMiddleware = require("./middlewares/errorMiddleware");  
const redis = require("./config/redis");

// Connect to Redis
redis();
connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);      // ✅ Ensure this import is valid
app.use("/api/recipes", recipeRoutes);  // ✅ Ensure this import is valid

// Error Middleware
app.use(errorMiddleware);    // ✅ Ensure this is properly imported

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
