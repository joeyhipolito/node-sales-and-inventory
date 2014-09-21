var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema(
  {
    purchase_order_id: String,
    product_id: String,
    product_name: String,
    quantity_ordered: Number,
    quantity_received: Number,
    unit_cost: Number,
    expiration: Date,
    status: {type: String, default: 'draft'}
  }
);

module.exports = mongoose.model('Order', orderSchema);
