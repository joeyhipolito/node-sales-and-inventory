var mongoose = require('mongoose');

var purchaseOrderSchema = new mongoose.Schema({
  supplier     : {
    id  : String,
    name: String
  },
  date_drafted : { type: Date, default: Date.now },
  date_issued  : Date,
  date_updated : Date,
  orders       : [orderSchema],
  status       : { type: String, default: 'draft' }
});

var orderSchema = new mongoose.Schema(
  {
    product_id: String,
    product_name: String,
    quantity_ordered: Number,
    quantity_received: Number,
    unit_cost: Number,
    expiration: Date
  }
);

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
