var mongoose = require('mongoose');

var accessSchema = mongoose.Schema({
  user     : String,
  time_in  : { type: Date, default: Date.now },
  time_out : Date 
});

accessSchema.methods.clockIn = function (uid) {
  this.user = uid;
  this.save();
  return this._id;
};

module.exports = mongoose.model('Access', accessSchema);
