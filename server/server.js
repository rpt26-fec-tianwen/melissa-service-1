const express = require('express');
const cors = require('cors');
const app = express();
const port = 6000;

const path = require('path');
const fs = require('fs');

const db = require('./database/connection.js');
const helpers = require('./database/helpers.js');
const seedingScript = require('./database/seedingScript.js');

const sampleData = require('../sampleData/sampleData.js');

const axios = require('axios');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public/index.html')));

app.get('/', (req, res) => {
  res.sendStatus('Hello world!');
});

app.get('/related-products/:id', (req, res) => {

  // Get the request parameters
  let id = req.params.id;

  // Gets the related product Ids from my database
  helpers.getRelatedProductIds(id)
    .then((data) => {

      let product_ids = data[0].related_products;

      // Gets the product information from Product Card service needed to display on front end
      const products = axios.get('http://localhost:6000/related/:ids', { params: { ids: product_ids } })
        .then(response => {
          res.status(200).send(response.data);
        })
        .catch(error => {
          res.status(500).send('Catch error getting related products: ', error);
        });

    });

});


app.get('/related/:ids', (req, res) => {

  let products = sampleData.createSampleData();

  let returnData = {};

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


// Not sure if I need this anymore.
// app.get('/createSampleData', (req, res) => {

//   sampleData.createSampleData();

//   res.sendStatus(200);
// });


app.listen(port, () => {
  console.log(`Fjallraven related products service listening at http://localhost:${port}`);
});