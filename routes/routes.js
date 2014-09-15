module.exports = function (app, passport) {

}

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {return next()};

  res.status(401);
  res.json(error: 'you are not logged in!');

}