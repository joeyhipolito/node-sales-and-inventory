var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name      : String,
  size      : Number,
  size_unit : String,
  packaging : String,
  dose      : Number,
  supplier  : {
    id   : String,
    name : String
  }
});

module.exports = mongoose.model('Product', productSchema);
