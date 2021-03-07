// From “/products-related/:id”: [{ id: #, title: “”, price: “”, url: “” }...];

const fs = require('fs');

const createSampleData = () => {

  let sampleProducts = [];

  for (var i = 1; i <= 100; i++) {
    let product = {};

    product['id'] = i;
    product['title'] = 'Sample product name';
    product['price'] = '$450.00';
    product['url'] = '/public/img/sampleDataImages/SINGI_DOWN_JACKET_W015.jpg';

    sampleProducts.push(product);
  }

  //console.log('sample products', sampleProducts);

  return sampleProducts;

}

module.exports.createSampleData = createSampleData;