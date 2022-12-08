const router = require('express').Router();
const {QueryTypes} = require("sequelize");
const sequelize = require("../config/connection");
const withAuth = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// GET /dashboard
router.get('/', withAuth,  async (req, res) => {
    try {
      // retrieve all Posts for the loggedin user, and associated Comments, and Comments of the post
      const posts = await Post.findAll({
        include: [
          {model: User},
          {model: Comment,
            include: {model: User}},
        ],
        order: [['createdAt', 'DESC']],
        where: {
          user_id: !req.session.userId ? null : req.session.userId 
        },
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
        return item;
      });
      // pass the object with posts, nbr of notifications, whether user is loggedin, and stats to dashboard.hbs view
      res.render('dashboard', {
        user: {
          firstName: req.session.firstName,
          lastName:  req.session.lastName,
          username:  req.session.username,
        },
        posts: postArr,
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
  


module.exports = router;