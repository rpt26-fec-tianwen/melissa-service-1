// From “/products-related/:id”: [{ id: #, title: “”, price: “”, url: “” }...];

const fs = require('fs');

const createSampleData = () => {

  let sampleProducts = [];

  for (var i = 1; i <= 100; i++) {
    let product = {};

    product['id'] = i;
    product['title'] = 'Sample product name';
    product['price'] = '$' + Math.floor(Math.random() * 575);
    product['url'] = '/public/img/sampleDataImages/SINGI_DOWN_JACKET_W015.jpg';

    sampleProducts.push(product);
  }

  return sampleProducts;

}




module.exports.createSampleData = createSampleData;