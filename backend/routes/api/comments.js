/**
 * @module routes/api/comments
 * @description Express router for handling comment-related API endpoints.
 */

 /**
    * GET /api/comments
    * @summary Get all comments.
    * @returns {Array<Object>} 200 - Array of comment objects.
    * @returns {Object} 500 - Internal Server Error.
    */

 /**
    * GET /api/comments/:id
    * @summary Get a comment by its ID.
    * @param {string} id - Comment ID.
    * @returns {Object} 200 - Comment object.
    * @returns {Object} 404 - Comment not found.
    * @returns {Object} 500 - Internal Server Error.
    */

 /**
    * POST /api/comments
    * @summary Create a new comment.
    * @param {Object} body - Comment data.
    * @returns {Object} 201 - Created comment object.
    * @returns {Object} 400 - Bad Request.
    */

 /**
    * PUT /api/comments/:id
    * @summary Update a comment by its ID.
    * @param {string} id - Comment ID.
    * @param {Object} body - Updated comment data.
    * @returns {Object} 200 - Updated comment object.
    * @returns {Object} 404 - Comment not found.
    * @returns {Object} 400 - Bad Request.
    */

 /**
    * DELETE /api/comments/:id
    * @summary Delete a comment by its ID.
    * @param {string} id - Comment ID.
    * @returns {Object} 200 - Success message.
    * @returns {Object} 404 - Comment not found.
    * @returns {Object} 500 - Internal Server Error.
    */

 /**
    * GET /api/comments/post/:postId
    * @summary Get all comments for a specific post.
    * @param {string} postId - Post ID.
    * @returns {Array<Object>} 200 - Array of comment objects.
    * @returns {Object} 500 - Internal Server Error.
    */

 /**
    * GET /api/comments/user/:userId
    * @summary Get all comments by a specific user.
    * @param {string} userId - User ID.
    * @returns {Array<Object>} 200 - Array of comment objects.
    * @returns {Object} 500 - Internal Server Error.
    */

 /**
    * GET /api/comments/post/:postId/count
    * @summary Get the count of comments for a specific post.
    * @param {string} postId - Post ID.
    * @returns {Object} 200 - Object with count property.
    * @returns {Object} 500 - Internal Server Error.
    */

 /**
    * GET /api/comments/user/:userId/count
    * @summary Get the count of comments by a specific user.
    * @param {string} userId - User ID.
    * @returns {Object} 200 - Object with count property.
    * @returns {Object} 500 - Internal Server Error.
    */

 /**
    * DELETE /api/comments/post/:postId
    * @summary Delete all comments for a specific post.
    * @param {string} postId - Post ID.
    * @returns {Object} 200 - Success message with deleted count.
    * @returns {Object} 500 - Internal Server Error.
    */

 /**
    * DELETE /api/comments/user/:userId
    * @summary Delete all comments by a specific user.
    * @param {string} userId - User ID.
    * @returns {Object} 200 - Success message with deleted count.
    * @returns {Object} 500 - Internal Server Error.
    */

 /**
    * GET /api/comments/recent/:n
    * @summary Get the most recent n comments.
    * @param {number} n - Number of comments to retrieve.
    * @returns {Array<Object>} 200 - Array of comment objects.
    * @returns {Object} 400 - Invalid number.
    * @returns {Object} 500 - Internal Server Error.
    */

 /**
    * GET /api/comments/post/:postId/recent/:n
    * @summary Get the most recent n comments for a specific post.
    * @param {string} postId - Post ID.
    * @param {number} n - Number of comments to retrieve.
    * @returns {Array<Object>} 200 - Array of comment objects.
    * @returns {Object} 400 - Invalid number.
    * @returns {Object} 500 - Internal Server Error.
    */

 /**
    * GET /api/comments/user/:userId/recent/:n
    * @summary Get the most recent n comments by a specific user.
    * @param {string} userId - User ID.
    * @param {number} n - Number of comments to retrieve.
    * @returns {Array<Object>} 200 - Array of comment objects.
    * @returns {Object} 400 - Invalid number.
    * @returns {Object} 500 - Internal Server Error.
    */

 /**
    * GET /api/comments/search
    * @summary Search comments by keyword in content.
    * @param {string} keyword - Keyword to search for.
    * @returns {Array<Object>} 200 - Array of comment objects.
    * @returns {Object} 400 - Keyword query parameter is required.
    * @returns {Object} 500 - Internal Server Error.
    */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
// Hey GitHub Copilot, please write the following API endpoints for comments:
// 1. GET /api/comments - Get all comments
// 2. GET /api/comments/:id - Get a comment by ID
// 3. POST /api/comments - Create a new comment
// 4. PUT /api/comments/:id - Update a comment by ID
// 5. DELETE /api/comments/:id - Delete a comment by ID

// 1. GET /api/comments - Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 2. GET /api/comments/:id - Get a comment by ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  } 
});

// 3. POST /api/comments - Create a new comment
router.post("/", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// 4. PUT /api/comments/:id - Update a comment by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: " Bad Request" });
  }
});

// 5. DELETE /api/comments/:id - Delete a comment by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const comments = await Comment.find({ userId: req.params.userId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/post/:postId/count", async (req, res) => {
  try {
    const count = await Comment.countDocuments({ postId: req.params.postId });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user/:userId/count", async (req, res) => {
  try {
    const count = await Comment.countDocuments({ userId: req.params.userId });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/post/:postId", async (req, res) => {
  try {
    const result = await Comment.deleteMany({ postId: req.params.postId });
    res
      .status(200)
      .json({ message: `${result.deletedCount} comments deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/user/:userId", async (req, res) => {
  try {
    const result = await Comment.deleteMany({ userId: req.params.userId });
    res
      .status(200)
      .json({ message: `${result.deletedCount} comments deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/recent/:n", async (req, res) => {
  try {
    const n = parseInt(req.params.n, 10);
    if (isNaN(n) || n <= 0) {
      return res.status(400).json({ error: "Invalid number" });
    }
    const comments = await Comment.find()
      .sort({ createdAt: -1 })
      .limit(n);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/post/:postId/recent/:n", async (req, res) => {
  try {
    const n = parseInt(req.params.n, 10);
    if (isNaN(n) || n <= 0) {
      return res.status(400).json({ error: "Invalid number" });
    }
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 })
      .limit(n);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user/:userId/recent/:n", async (req, res) => {
  try {
    const n = parseInt(req.params.n, 10);
    if (isNaN(n) || n <= 0) {
      return res.status(400).json({ error: "Invalid number" });
    }
    const comments = await Comment.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(n);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ error: "Keyword query parameter is required" });
    }
    const regex = new RegExp(keyword, "i"); // Case-insensitive search
    const comments = await Comment.find({ content: regex });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// add another end point for deleting a comment by its ID
router.delete("/:id", (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(deletedComment => {
            if (!deletedComment) {
                return res.status(404).json({ error: "Comment not found" });
            }
            res.status(200).json({ message: "Comment deleted successfully" });
        })
        .catch(() => {
            res.status(500).json({ error: "Internal Server Error" });
        });
});