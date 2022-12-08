const withAuth = (req, res, next) => { 
  // below code is only in dev.. comment out prior to going live
  // if (!req.session.loggedIn) {
  //   req.session.loggedIn = true;
  //   req.session.userId = 2;
  // }

  // user is not logged in, redirect to homepage
  if (!req.session.loggedIn) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = withAuth;
