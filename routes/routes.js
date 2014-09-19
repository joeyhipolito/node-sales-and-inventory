module.exports = function (app, passport) {

  // home

  // authentication
  var auth = require('../controllers/auth');
  app.post('/register', passport.authenticate('register'), auth.register);
  app.post('/auth', passport.authenticate('login'), auth.login);
  app.delete('/auth', auth.logout);

}

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {return next()};

  res.status(401);
  res.json({error: 'you are not logged in!'});

}