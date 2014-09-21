var mongoose = require('mongoose');
var User     = require('../models/user');

var accessSchema = mongoose.Schema({
  user     : {
    id        : String,
    firstname : String,
    lastname  : String,
    role      : String
  },
  time_in  : { type: Date, default: Date.now },
  time_out : Date 
});

accessSchema.methods.clockIn = function (uid) {
  User.findById(uid, function (err, user) {
    this.user.id = user._id;
    this.user.firstname = user.firstname;
    this.user.lastname = user.lastname;
    this.user.role = user.role;
    this.save();
    return this._id;
  });
};

module.exports = mongoose.model('Access', accessSchema);
