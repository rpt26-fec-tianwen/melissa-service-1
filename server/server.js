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
  console.log(id);

  // Assigns fake data (before I'm able to get API)
  // Switch out later
  let data = sampleData.createSampleData();

  // Get the related product ids
  helpers.getRelatedProductIds(id)
    .then((data) => {
      // reach out to Product Card API

      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });


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