const express = require('express');
const cors = require('cors');
const app = express();
const port = 6000;

const path = require('path');
const fs = require('fs');

const database = require('./database/database.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public/index.html')));

app.get('/', (req, res) => {
  res.sendStatus('Hello world!');
});

app.get('/related-products/:id', (req, res) => {
  console.log('Serving up your related products');

  res.sendStatus(200);
});

app.get('/seed', (req, res) => {
  database.seed();
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Fjallraven related products service listening at http://localhost:${port}`);
})