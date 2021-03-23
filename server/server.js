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


// Make a request to this route to seed the database
// app.get('/seed', (req, res) => {
//   seedingScript.seedDatabase((err, results) => {
//     if (err) {
//       console.log('Error seeding');
//     }
//     res.status(200).send(results);
//   });

// });

app.get('/:id', (req, res) => {

  const path = __dirname.split('/');
  const strippedPath = path.slice(0, path.length - 1).join('/');

  res.sendFile(strippedPath + '/public/');
});

app.get('/related-products/:id', (req, res) => {

  let id = req.params.id;

  // Gets the related product Ids from my database
  helpers.getRelatedProductIds(id)
    .then((data) => {

      let product_ids = data[0].related_products;

      async function getProductNamePriceURL() {
        return response = await axios.get(`http://localhost:8001/related/${id}`, { params: { ids: product_ids } } );
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



app.listen(port, () => {
  console.log(`Fjallraven related products service listening at http://localhost:${port}`);
});