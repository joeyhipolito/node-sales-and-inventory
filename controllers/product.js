var ObjectId = require('mongoose').Types.ObjectId;
var Product = require('../models/product');

exports.create = function (req, res) {
  var post = req.body;
  var product = new Product();
  product.name    = post.name;
  product.save();
  res.json(product);
};

exports.query = function (req, res) {
  Product.find({}, function (err, products) {
    res.json(products);
  });
};

exports.get = function (req, res) {
  Product.findById(req.param('id'), function (err, product) {
    res.json(product);
  });
};

exports.update = function (req, res) {
  var id = req.param('id');
  var post = req.body;
  Product.findByIdAndUpdate(id, function (err, product) {
    product.name = post.name;
    product.supplier.name = post.supplier.name;
    product.supplier.id = post.supplier.id;
  });
};

exports.delete = function (req, res) {
  var id = req.param('id');
  Product.findByIdAndRemove(id, function (err) {
    if (err) {
      res.json({error: err});
    }
    res.json({success: true});
  });
};