const db = require('./connection');
const axios = require('axios');

// Gets data from my database
async function getRelatedProductIds(id, callback) {

  // Find the record in the database, return the array of related product ids
  let relatedProductIds = await db.relatedproducts.find({ '_id': id });

  return relatedProductIds;

}

module.exports.getRelatedProductIds = getRelatedProductIds;