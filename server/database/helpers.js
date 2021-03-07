const db = require('./connection');

// Gets data from my database
async function getRelatedProductIds(id, callback) {

  // Find the record in the database, return the array of related product ids
  let relatedProductIds = await db.RelatedProducts.find({ '_id': id });

  return relatedProductIds;

}


// Reaches out to Product Card API to get product info
// Input - array of product ids
// Output - array of product info (title, price, image) for each product id

let getProductCardData = (productIdsArray) => {

}



module.exports.getRelatedProductIds = getRelatedProductIds;
