const router = require('express').Router();
const { User } = require('../../models');
// const User = require('../../models/User');

// POST /api/users/signup
router.post('/signup', async (req, res) => {
  console.log(req.body);
  try {
    // create a new user on the DB
    const dbUserData = await User.create(
      req.body
    );

    // save the loggedin User info and loggedin flag in session, and return the created User model instance
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      req.session.firstName = dbUserData.first_name;
      req.session.lastName = dbUserData.last_name;
      req.session.username = dbUserData.username;
      res.status(200).json(dbUserData);
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // if username doesn't exist return error
    if (!dbUserData) {
      res.status(399).json({ message: 'Username does not exist. Please try again!' });
      return;
    }

    // invoke the User model's method that utilizes the bcrypt method to check if passwords match
    const validPassword = await dbUserData.checkPassword(req.body.password);

    // if passwords dont match return error
    if (!validPassword) {
      res.status(399).json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    // save the loggedin User info and loggedin flag in session, and return the created User model instance
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      req.session.firstName = dbUserData.first_name;
      req.session.lastName = dbUserData.last_name;
      req.session.username = dbUserData.username;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;