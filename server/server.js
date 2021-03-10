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

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public/index.html')));

app.get('/', (req, res) => {
  res.sendStatus('Hello world!');
});

app.get('/related-products/:id', (req, res) => {

  // Get the request parameters
  let id = req.params.id;

  helpers.getRelatedProductIds(id)
    .then((data) => {

      let related_productIds = data[0].related_products;
      console.log(related_productIds);

      let requestParams = '';

      // Builds the query string with the array of product ids
      for (var i = 1; i < related_productIds.length; i++) {
        if (i < related_productIds.length - 1) {
          requestParams += `id[` + i + `]=` + related_productIds[i] + `&`
        }
        else {
          requestParams += `id[` + i + `]=` + related_productIds[i]
        }
      }

      return requestParams;

    })
    .then((requestParams) => {
      console.log(requestParams);

      axios({
        method:'get',
        url: `/imposterData`
      })
      .then((response) => {
        console.log('yooooo');
        res.status(200).send(response);
      })
    })
    .catch((error) => {
      console.log('what happened');
      res.status(500).send(error);
    });


});

// Route to fake external API data call
app.get('/imposterData', (req, res) => {

  //console.log(req.params.productIds);

  let data = sampleData.createSampleData();

  let returnData = {};

  for (var i = 0; i < 8; i++) {
    returnData[i] = data[i];
  }

  res.status(200).send(returnData);

});


app.get('/createSampleData', (req, res) => {

  sampleData.createSampleData();

  res.sendStatus(200);
});


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