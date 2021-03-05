const seeding = () => {

  // Create an array that has 100 of the following [item+ num, array of 4 - 8 random numbers between 1 and 100]

  let seeds = [];

  for (var i = 1; i <= 100; i++) {

    let seed = {};

    // Get a random number between 4 and 8
    let randomProductIds = [];
    let numberOfRelatedProducts = Math.random() * (8 - 4) + 4;

    // Get a number from 1 - 100, between the specified number of times above
    for (var j = 0; j <= numberOfRelatedProducts; j++) {
      let productId = Math.floor(Math.random() * Math.floor(100));
      randomProductIds.push(productId);
    }

    seed['_id'] = i;
    seed['related_products'] = randomProductIds;

    seeds.push(seed);

  }

  return seeds;

}

module.exports.seeding = seeding;