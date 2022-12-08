const router = require('express').Router();
const sequelize = require("sequelize");
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// GET /
router.get('/', async (req, res) => {
  try {
    // retrieve all Posts and associated Comments, with user information of the creator, and total counts of Likes, Dislikes, Comments of the post, and whether the loggedin user has already liked/disliked this post
    const posts = await Post.findAll({
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
    const postArr = posts.map(post => {
      // convert to object without sequelize metadata
      const item = post.get(({ plain: true }));
      // convert json to object for handlebars decision process
      item.api_object = JSON.parse(item.api_json);
      return item;
    });

    // // pass the object with posts, nbr of notifications, and whether user is loggedin, to homepage.hbs view
    res.render('homepage', {
      posts: postArr,
      loggedIn: req.session.loggedIn
    });

    // This code is used for debugging. If used, then must comment out res.render code below
    // res.json({
    //   posts: postArr,
    //   loggedIn: req.session.loggedIn
    // });


  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;