const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const blogRoutes = require("./routes/blog.routes");
dotenv.config();

const app = express();

// MongoDB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Blog Management System API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});