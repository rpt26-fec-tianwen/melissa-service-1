const express = require('express');
const cors = require('cors');
const app = express();
const port = 8003;

const path = require('path');
const fs = require('fs');

const db = require('./database/connection.js');
const helpers = require('./database/helpers.js');
const seedingScript = require('./database/seedingScript.js');

const sampleData = require('../sampleData/sampleData.js');

const axios = require('axios');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public/')));


app.get('/', (req, res) => {
  const path = __dirname.split('/');
  const strippedPath = path.slice(0, path.length - 1).join('/');

  res.sendFile(strippedPath + '/public/');
});


app.get('/:id', (req, res) => {
  const path = __dirname.split('/');
  const strippedPath = path.slice(0, path.length - 1).join('/');

  res.sendFile(strippedPath + '/public/');
});

app.get('/related-products/:id', (req, res) => {

  // Get the request parameters
  let id = req.params.id;

  // Gets the related product Ids from my database
  helpers.getRelatedProductIds(id)
    .then((data) => {

      let product_ids = data[0].related_products;

      // Gets the product information from the Product Card service API
      async function getProductNamePriceURL() {

        return response = await axios.get('http://localhost:8003/related/:ids', { params: { ids: product_ids } } );
      }

      getProductNamePriceURL()
        .then(response => {
          res.status(200).send(response.data);
        })
        .catch(error => {
          res.status(500).send(error);
        });

    });

});


app.get('/related/:ids', (req, res) => {

  // console.log('request params are ', req.query);
  //let ids = req.params.ids;
  //console.log('the ids requested were: ', ids);

  let products = sampleData.createSampleData();

  let returnData = [];

  for (var i = 0; i < 8; i++) {
    returnData[i] = products[i];
  }

  res.status(200).send(returnData);

});


// Make a request to this route to seed the database
app.get('/seed', (req, res) => {
  seedingScript.seedDatabase((err, results) => {
    if (err) {
      console.log('Error seeding');
    }
    res.status(200).send(results);
  });

});

app.listen(port, () => {
  console.log(`Fjallraven related products service listening at http://localhost:${port}`);
});