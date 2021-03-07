const mongoose = require('mongoose');

// Local DB Connection
let connection = mongoose.connect('mongodb://localhost/fjallraven', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connection.js - Connected to Fjallraven related products database'))
  .catch(err => console.log(err));

// Schema
const relatedProductsSchema = mongoose.Schema({
  _id: Number,
  related_products: Array
});

// Model
const RelatedProducts = mongoose.model('RelatedProducts', relatedProductsSchema);

module.exports = { RelatedProducts: RelatedProducts }

