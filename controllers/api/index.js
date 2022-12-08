const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes.js");
const commentRoutes = require("./comment-routes");
const withAuth = require('../../middleware/auth');

// POST /api/users/signup,  POST /api/users/login 
router.use("/users", userRoutes); 

// GET /api/posts/:id,  POST /api/posts
router.use("/posts", withAuth, postRoutes);

// POST /api/comments
router.use("/comments", withAuth, commentRoutes);

module.exports = router;