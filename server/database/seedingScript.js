const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fjallraven', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Fjallraven related products database'))
  .catch(err => console.log(err));

// Schema
const relatedProductsSchema = mongoose.Schema({
  _id: Number,
  related_products: Array
});

// Model
const RelatedProducts = mongoose.model('RelatedProducts', relatedProductsSchema);


// Creates 100 documents with an _id key and a related_products key
// related_products value is an array of length 4 - 8
// each array value is a random number between 1 and 100
const createDataForSeeding = () => {

  let seeds = [];

  for (var i = 1; i <= 100; i++) {

    let seed = {};

    // Get a random number between 4 and 8
    let randomProductIds = [];
    let numberOfRelatedProducts = Math.random() * (8 - 3) + 3;

    // Get a number from 1 - 100, between 4 and 8 times, depending on numberOfRelatedProducts
    for (var j = 0; j <= numberOfRelatedProducts; j++) {
      let productId = Math.floor(Math.random() * Math.floor(100));
      randomProductIds.push(productId);
    }

    // Sets the value of the _id and related_products array
    seed['_id'] = i;
    seed['related_products'] = randomProductIds;

    seeds.push(seed);

  }

  return seeds;

}


// Seeds the db with random data
let seedDatabase = (callback) => {

  // Gets random generated data
  let data = createDataForSeeding();

  // Delete all existing documents in collection RelatedProducts
  RelatedProducts.deleteMany({})
    .then(() => {

      // Iterate through data and create documents according to schema
      data.forEach(product => {

        const related = new RelatedProducts({
          _id: product._id,
          related_products: product.related_products
        });

        // Save each new document
        related.save(function (err, related) {
          if (err) return console.log(err);
        });

      });

    })
    // Get the final dataset and return it
    .then(() => {
      async function getData() {
        const data = await RelatedProducts.find({});
      }
      // Send the data back into the GET response
      callback(null, data);
    })
    .catch((err) => {
      throw err;
    });

}

module.exports.seedDatabase = seedDatabase;

