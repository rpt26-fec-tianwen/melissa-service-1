const db = require('./connection');

// Creates 100 documents with an '_id' key and a 'related_products' key
// The 'related_products' value is an array with a random length between 4 and 8
// Each array value itself is a random number between 1 and 100 to represent product ids
const createDataForSeeding = () => {

  let seeds = [];

  for (var i = 1; i <= 100; i++) {

    let seed = {};

    // Get a random number between 4 and 8
    let randomProductIds = [];
    let numberOfRelatedProducts = Math.random() * (8 - 3) + 3;

    // Get a number from 1 - 100, between 4 and 8 times, depending on numberOfRelatedProducts
    for (var j = 0; j <= numberOfRelatedProducts; j++) {
      let productId = Math.round(Math.random() * (100 - 1) + 1);
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

  // Gets random generated data from createDataForSeeding function above
  let allRelatedProductsIds = createDataForSeeding();

  // Delete all existing documents in collection RelatedProducts to start with empty collection
  db.relatedproducts.deleteMany({})
    .then(() => {

      // Iterate through data and create documents according to schema
      async function saveToDatabase() {

        return saved = await allRelatedProductsIds.forEach(product => {

          const related = new db.relatedproducts({
            _id: product._id,
            related_products: product.related_products
          });

          // Save each new document
          related.save(function (err, related) {
            if (err) {
              callback(err, null);
            }
          });

        });
      };

      // Respond with a message that it is saving
      saveToDatabase()
        .then((error, results) => {
          if (error) {
            callback(error, null);
          }

          callback(null, 'Saving');
        })
        .catch((err) => {
          console.log('Error in seedingScript catch ', err);
        });
    });
}

module.exports.seedDatabase = seedDatabase;

