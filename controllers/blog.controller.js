const Blog = require("../models/blog.model");

const createBlog = async (req, res) => {
  try {
    const { title, content, authorName, tags, blogImage } = req.body;

    if (!title || !content || !authorName) {
      return res.status(400).json({
        message: "Title, content and authorName are required",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      authorName,
      tags: tags || [],
      blogImage: blogImage || "",
      creator: req.user.userId,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Blog creation failed",
      error: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, authorName, tags, blogImage } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Only creator can update
    if (blog.creator.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        message: "You can only update your own blog",
      });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.authorName = authorName || blog.authorName;
    blog.tags = tags || blog.tags;
    blog.blogImage = blogImage || blog.blogImage;

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Blog update failed",
      error: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Only creator can delete
    if (blog.creator.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        message: "You can only delete your own blog",
      });
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Blog deletion failed",
      error: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};