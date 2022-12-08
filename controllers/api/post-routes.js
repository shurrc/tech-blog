const router = require("express").Router();
const sequelize = require("sequelize");
const withAuth = require("../../middleware/auth");
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    // retrieve one specific Post by Id, and associated Comments, with user information of the creator, and total counts of Likes, Dislikes, Comments of the post, and whether the loggedin user has already liked/disliked this post
    const post = await Post.findByPk(req.params.id, {
      include: [
        {model: User}, 
        {model: Comment,
          include: {model: User}},
      ],
      order: [['createdAt', 'DESC']],
      attributes: {
        include: [
          [ //total comments for the post
            sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.post_id = post.id)'), 
            'totalComments'
          ],
        ]
      }
    });

    // if post doesnt exist, return error
    if (!post) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }

    // convert to object without sequelize metadata
    res.status(200).json(post.get(({ plain: true })));

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST /api/posts
router.post('/', async (req, res) => {
  try {
    // create a new post on the DB with the user_id being the loggedin user
    const dbPostData = await Post.create({
      title: req.body.title,
      contents: req.body.contents,
      user_id: !req.session.userId ? null : req.session.userId,
    });
    
    // return the created Post instance
    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


module.exports = router;
