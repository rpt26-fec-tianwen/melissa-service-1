const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const models = require('./models');
const Op = models.Sequelize.Op;



models.Related_Products.findAll().then(pr => console.log(pr));


// const prod = await Related_Products.create({related_products: '[3,5,7]'});
// console.log(prod);

