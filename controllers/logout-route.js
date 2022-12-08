const router = require('express').Router();

// GET /logout
router.get('/', (req, res) => {
  // if user is logged in, delete the session and redirect to homepage
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/');   
      return;
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;