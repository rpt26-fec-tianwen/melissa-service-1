const db = require('./connection');
const axios = require('axios');

// Gets data from my database
async function getRelatedProductIds(id, callback) {

  // Find the record in the database, return the array of related product ids
  let relatedProductIds = await db.relatedproducts.find({ '_id': id });

  return relatedProductIds;

}


// Reaches out to Product Card API to get product info
// Input - array of product ids
// Output - array of product info (title, price, image) for each product id


// I don't know what this is anymore
let getProductCardData = (productIdsArray) => {

  axios.get('/imposterData', {
    params: {
      productIdsArray: productIdsArray
    },
    paramsSerializer: params => {
      return qs.stringify(params)
    }
  });

}



module.exports.getRelatedProductIds = getRelatedProductIds;
module.exports.getProductCardData = getProductCardData;