const router = require("express").Router();
const {QueryTypes} = require("sequelize");
const sequelize = require("../../config/connection");
const Comment = require("../../models/Comment");

//route to create a comment
// POST /api/comments
router.post("/",  async (req, res) => {
  try {
    // create a Comment with the user_id being the loggedin User
    let dbCommentData = await Comment.create({
      contents: req.body.contents,
      post_id: req.body.postId,
      user_id: !req.session.userId ? null : req.session.userId,
    });

    // convert to object without sequelize metadata
    dbCommentData = dbCommentData.get({ plain: true });

    // retrieve the user_id of the post creator
    const [{"user_id": postUserId}] = await sequelize.query(
      `SELECT user_id 
          FROM post 
         WHERE post.id = ${req.body.postId}`,
         {type: sequelize.QueryTypes.SELECT});

    // return the created Comment model instance
    res.status(200).json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;