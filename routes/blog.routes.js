const express = require("express");

const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createBlog);

router.get("/", authMiddleware, getAllBlogs);

router.get("/:id", authMiddleware, getSingleBlog);

router.put("/:id", authMiddleware, updateBlog);

router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;