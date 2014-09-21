var Order = require('../models/order');
var PurchaseOrder = require('../models/purchase-order');
var ObjectId = require('mongoose').Types.ObjectId;

exports.query = function (req, res) {

  Order.find({}, function (err, orders) {
    res.json(orders);
  });

};

exports.get = function (req, res) {
  var id = req.param('id');

  Order.findById(id, function (err, order) {
    res.json(order);
  });
};

exports.create = function (req, res) {

  var post = req.body;
  
  PurchaseOrder.findById(post.purchase_order_id, function (err, purchaseOrder) {

    if (err) {
      res.json({error: err});
    }

    if (purchaseOrder) {
      var order = new Order();
      order.purchase_order_id = purchaseOrder._id;
      order.product_id = post.product_id;
      order.product_name = post.product_name;
      order.quantity_ordered = post.quantity_ordered;
      order.save(function (newOrder) {
        purchaseOrder.orders.push(
          { 
            order_id: order._id,
            product_id: order.product_id,
            product_name: order.product_name,
            quantity_ordered: order.quantity_ordered
          }
        );
        purchaseOrder.save();
        res.json(purchaseOrder);
      });
    }

  });
  
};

exports.update = function (req, res) {
  var id = req.param('id');
}

exports.delete = function (req, res) {
  var id = req.param('id');
  Order.findByIdAndRemove(id, function (err) {
    if (err) {
      res.json({error: err});
    }
    res.json({success: true});
  });
}