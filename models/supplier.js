var mongoose = require('mongoose');

var supplierSchema = mongoose.Schema({
  name           : String,
  tin            : String,
  address        : String,
  contact_number : String,
  contact_person : String,
  email          : String,
  products       : [
    {id: String, name: String}
  ]
});

module.exports = mongoose.model('Supplier', supplierSchema);
