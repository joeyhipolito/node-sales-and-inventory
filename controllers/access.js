var Access = require('../models/access');

exports.query = function (req, res) {

  Access.find({}, function (err, access) {
    res.json(access);
  });

};