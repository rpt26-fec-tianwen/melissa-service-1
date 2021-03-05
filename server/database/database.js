const seedingScript = require('./seedingScript.js');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fjallraven', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Fjallraven related products database'))
  .catch(err => console.log(err));

const relatedProductsSchema = new mongoose.Schema({
  _id: Number,
  related_products: Array
});

const RelatedProducts = mongoose.model('RelatedProducts', relatedProductsSchema);

//const _id = new Related_Products({ _id: _id, related_products: [3,5,7]});

//console.log(item1.related_products);

let fakeData = seedingScript.seeding();

let seed = () => {

  // Delete all existing collections to start fresh
  RelatedProducts.deleteMany();

  let data = seedingScript.seeding();
  console.log('Seeding your beautiful mongodb');

}

module.exports.seed = seed;