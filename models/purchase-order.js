var mongoose = require('mongoose');

var purchaseOrderSchema = mongoose.Schema({
  supplier     : {
    id  : String,
    name: String
  },
  date_drafted : { type: Date, default: Date.now },
  date_issued  : Date,
  date_updated : Date,
  status       : { type: String, default: 'draft' } 
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
