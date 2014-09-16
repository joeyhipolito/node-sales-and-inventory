var ObjectId = require('mongoose').Types.ObjectId; 
var Access = require('../models/access');

exports.login = function (req, res) {
  res.json({
    'id'       : req.user._id,
    'username' : req.user.username,
    'name'     : req.user.firstname + ' ' + req.user.lastname,
    'role'     : req.user.role
  });
};

exports.logout = function (req, res) {
  if(req.user) {
    Access.findOne({_id: ObjectId(req.user.session_id)}, function (err, access) {
      if (access) {
        access.time_out = new Date();
        access.save();
        req.logout();
        res.json({
          'loggedOut' : true
        });
      };
    });
    
  } else {
    res.status(400);
    res.json({
      'error' : 'You are not logged in.'
    });
  }
};

exports.register = function (req, res) {
  if (req.user) {
    res.json({
      'id'       : req.user._id,
      'username' : req.user.username,
      'name'     : req.user.firstname + ' ' + req.user.lastname,
      'role'     : req.user.role
    });
  }
}