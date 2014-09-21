var _ = require('underscore');
var ObjectId = require('mongoose').Types.ObjectId;
var Supplier = require('../models/supplier');
var Product  = require('../models/product');
var Order    = require('../models/order');
var PurchaseOrder = require('../models/purchase-order');

exports.create = function (req, res) {
  var post = req.body;
  Supplier.findById(post.supplier, function (err, supplier) {
    var po = new PurchaseOrder();
    po.supplier.id = supplier._id;
    po.supplier.name = supplier.name;
    po.save(function (err, po) {
      res.json(po);
    });
  });
};

exports.query = function (req, res) {
  PurchaseOrder.find({}, function (err, purchaseOrders) {
    // _.each(purchaseOrders, function (purchaseOrder) {
    //   purchaseOrder.date_issued = purchaseOrder.date_issued.getTime();
    //   purchaseOrder.date_updated = purchaseOrder.date_updated.getTime();
    // });
    res.json(purchaseOrders);
  });
};

exports.get = function (req, res) {
  PurchaseOrder.findById(req.params('id'), function (err, purchaseOrder) {
    res.json(purchaseOrder);
  });
};

exports.update = function (req, res) {
  var id = req.param('id');
  PurchaseOrder.findByIdAndUpdate(id, {
    date_issued  : Date.now(),
    date_updated : Date.now(),
    status       : 'issued'
  } ,function (err, po) {
    // var orders = req.body.orders;
    // for (var i = orders.length - 1; i >= 0; i--) {
    //   console.log(orders[i].quantity_ordered);
    //   Product
    //     .where('_id')
    //     .equals(ObjectId(orders[i].product_id))
    //     .exec(function (product) {
    //       var newOrder = new Order();
    //       newOrder.purchase_order_id = po._id;
    //       newOrder.product_id = product._id;
    //       newOrder.product_name = product.name;
    //       newOrder.quantity_ordered = orders[i].quantity_ordered;
    //       newOrder.save();
    //     });

      // Product.findById(orders[i].product_id, function (err, product) {
      //   var newOrder = new Order();
      //   newOrder.purchase_order_id = po._id;
      //   newOrder.product_id = product._id;
      //   newOrder.product_name = product.name;
      //   newOrder.quantity_ordered = orders[i].quantity_ordered;
      //   newOrder.save();
      // });
    // };

    res.json(po);
    // Supplier.findById(po.supplier.id, function (err, supplier) {
    //   var supplier_products = [];

    //   for (var i = supplier.products.length - 1; i >= 0; i--) {
    //     supplier_products.push(supplier.products[i].id);
    //   };

    //   for (var i = po.orders.length - 1; i >= 0; i--) {
    //     if (_.contains(supplier_products, po.orders[i].product_id)) {
    //       console.log('yes');
    //     } else {
    //       Product.findById(po.orders[i].product_id, function (err, product) {
    //         product.suppliers.push({id: supplier._id, name: supplier.name});
    //         product.save();
    //         supplier.products.push({id: product._id, name: product.name});
    //         supplier.save();
    //       });
    //     }
    //   };
    // });
  });
};

exports.delete = function (req, res) {
};