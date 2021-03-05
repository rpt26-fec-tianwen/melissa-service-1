const seedingScript = require('./seedingScript.js');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fjallraven', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Fjallraven related products database'))
  .catch(err => console.log(err));

const relatedProductsSchema = new mongoose.Schema({
  _id: Number,
  related_products: Array
});

// Sets up a model using the schema
const RelatedProducts = mongoose.model('RelatedProducts', relatedProductsSchema);


// Seeds the db with random data
let seed = (callback) => {

  // Gets random generated data
  let data = seedingScript.seeding();

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

module.exports.seed = seed;