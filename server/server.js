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

app.use('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  const path = __dirname.split('/');
  const strippedPath = path.slice(0, path.length - 1).join('/');

  res.sendFile(strippedPath + '/public/');
});


// Make a request to this route to seed the database
app.get('/seed', (req, res) => {
  seedingScript.seedDatabase((err, results) => {
    if (err) {
      console.log('Error seeding');
      res.status(500);
    } else {
      res.status(200).send(results);
    }
  });

});

app.get('/:id', (req, res) => {

  const path = __dirname.split('/');
  const strippedPath = path.slice(0, path.length - 1).join('/');

  res.sendFile(strippedPath + '/public/');
});

app.get('/related-products/:id', (req, res) => {

  let id = req.params.id;
  let fallbackData = sampleData.createSampleData();

  // Gets the related product Ids from my database
  helpers.getRelatedProductIds(id)
    .then((data) => {

      let product_ids = data[0].related_products;

      async function getProductNamePriceURL() {
        return response = await axios.get(`http://product-card.fjakeraven.com/related/${id}`, { params: { ids: product_ids } });
      }
      getProductNamePriceURL()
        .then(response => {
          res.status(200).send(response.data);
        })
        .catch(error => {
          // If product card API unavailable, send default sample data

          res.status(200).send(fallbackData);
        });

    })
    .catch(error => {
      res.status(200).send(fallbackData);
    });

});



app.listen(port, () => {
  console.log(`Fjallraven related products service listening at http://localhost:${port}`);
});