const router = require('express').Router();
const apiRoute = require('./api');
const homePageRoute = require('./homepage-route.js');
const dashboardRoute = require('./dashboard-route.js');
const logoutRoute = require('./logout-route.js');
const withAuth = require('../middleware/auth'); // used to redirect to homepage if user is not loggedin

// requests initiated by a javascript event handler, to create/update or retrieve one row from the DB
router.use('/api', apiRoute);

// request for the homepage which displays all posts retrieved from the DB  
router.use('/', homePageRoute);

// request to delete the session object and redirect to homepage
router.use('/logout',  logoutRoute);

//request to display only posts that the loggedin user created, and stats retrieved from the DB
router.use('/dashboard', withAuth, dashboardRoute);


// default to 404 page, if invlaid Ajax request
router.get('*',  (req, res) => {
  res.render('404');
})

module.exports = router;

