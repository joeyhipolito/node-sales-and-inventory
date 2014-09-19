var ObjectId = require('mongoose').Types.ObjectId; 
var Supplier = require('../models/supplier');

exports.create = function (req, res) {
  var post = req.body;
  var supplier = new Supplier();
  supplier.name    = post.name;
  supplier.address = post.address;
  supplier.tin     = post.tin;
  supplier.email   = post.email;
  supplier.contact_person = post.contact_person;
  supplier.contact_number = post.contact_number;
  supplier.save();
  res.json(supplier);
};

exports.query = function (req, res) {

  Supplier.find({}, function (err, suppliers) {
    res.json(suppliers);
  });

};

exports.get = function (req, res) {
  var id = req.param('id');
  Supplier.findById(id, function (err, supplier) {
    if (err) {
      res.json({error: err});
    }

    if (supplier) {
      res.json(supplier);
    }

  });
};

exports.update = function (req, res) {
  var id = req.param('id');
  var post = req.body;
  Supplier.findByIdAndUpdate(id, {
    name : post.name,
    address : post.address,
    tin     : post.tin,
    email   : post.email,
    contact_person : post.contact_person,
    contact_number : post.contact_number
  }, function (err, supplier) {
    if (err) {
      res.json({error: err});
    }
    res.json(supplier);
  });

};

exports.delete = function (req, res) {
  var id = req.param('id');
  Supplier.findByIdAndRemove(id, function (err) {
    if (err) {
      res.json({error: err});
    }
    res.json({success: true});
  });
};