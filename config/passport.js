var User          = require('../models/user');
var Access        = require('../models/access');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // login

  passport.use('login', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      User.findOne({'username' : username}, function (err, user) {
        if (err) {
          return done(err);
        }

        if (!user || !user.validPassword(password)) {
          return done(null, false);
        }
        
        var access = new Access();
        access.user.id = user._id;
        access.user.firstname = user.firstname;
        access.user.lastname = user.lastname;
        access.user.role = user.role;
        access.save();
        user.session_id = access._id;
        user.save();
        return done(null, user);

      });
    }
  ));

  passport.use('register', new LocalStrategy(
    {
      usernameField  : 'username',
      passwordField  : 'password',
      passReqToCallback: true

    },
    function (req, username, password, done) {
      console.log(username + password);
      User.findOne({'username' : username}, function (err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false);
        } else {
          var newUser = new User();
          newUser.username  = username;
          newUser.password  = newUser.generateHash(password);
          newUser.firstname = req.body.firstname;
          newUser.lastname  = req.body.lastname;
          newUser.role      = req.body.role;

          newUser.save(function (err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }

      });
    }
  ));
}