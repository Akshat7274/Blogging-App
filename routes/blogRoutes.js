const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogControlller,
} = require("../controllers/blogControlller");

// Router Object Creation
const router = express.Router();

// Get All Blogs
router.get("/all-blog", getAllBlogsController);

// Create New Blog
router.post("/create-blog", createBlogController);

// Update Existing Blog
router.put("/update-blog/:id", updateBlogController);

// Fetch a Single Blog
router.get("/get-blog/:id", getBlogByIdController);

// Delete Blog
router.delete("/delete-blog/:id", deleteBlogController);

// Get User's Blogs
router.get("/user-blog/:id", userBlogControlller);

module.exports = router;