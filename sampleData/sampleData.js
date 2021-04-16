const fs = require('fs');

const createSampleData = () => {

  // let sampleProducts = [];

  // for (var i = 1; i <= 100; i++) {
  //   let product = {};

  //   product['id'] = i;
  //   product['title'] = 'Sample product name';
  //   //product['price'] = '$' + Math.floor(Math.random() * 575);
  //   product['price'] = '$250';
  //   product['url'] = 'https://www.fjallraven.com/globalassets/catalogs/fjallraven/f8/f896/f89655/f625/7323450538934_fw19_a_nuuk_parka_w_fjaellraeven_21.jpg?width=312&height=312&mode=BoxPad&bgcolor=fff&quality=80';

  //   sampleProducts.push(product);
  // }

  // return sampleProducts;


  let sampleProducts =
  [
    {
      id: 1,
      title: 'Lorem ipsum dolor ',
      price: '$150',
      url: 'https://melissa-service-1.s3.us-east-2.amazonaws.com/fjallraven-default-related-1.jpg'
    },
    {
      id: 2,
      title: 'Consectetur adipiscing elit',
      price: '$350',
      url: 'https://melissa-service-1.s3.us-east-2.amazonaws.com/fjallraven-default-related-2.jpg'
    },
    {
      id: 3,
      title: 'Mauris viverra mollis sem',
      price: '$450',
      url: 'https://melissa-service-1.s3.us-east-2.amazonaws.com/fjallraven-default-related-3.jpg'
    },
    {
      id: 4,
      title: 'Vestibulum condimentum',
      price: '$550',
      url: 'https://melissa-service-1.s3.us-east-2.amazonaws.com/fjallraven-default-related-4.jpg'
    }
    // ,
    // {
    //   id: 5,
    //   title: 'Duis commodo',
    //   price: '$350',
    //   url: 'https://www.fjallraven.com/globalassets/catalogs/fjallraven/f8/f861/f86121/f154/expedition_pack_down_hoodie_m_86121-154_a_main_fjr.jpg?width=312&height=312&mode=BoxPad&bgcolor=fff&quality=80'
    // },
    // {
    //   id: 6,
    //   title: 'Suspendisse mattis ac',
    //   price: '$60',
    //   url: 'https://www.fjallraven.com/globalassets/catalogs/fjallraven/f8/f806/f80665/f215/7323450534165_fw19_a_yupik_parka_m_fjaellraeven_21.jpg?width=312&height=312&mode=BoxPad&bgcolor=fff&quality=80'
    // },
    // {
    //   id: 7,
    //   title: 'Donec sollicitudin',
    //   price: '$250',
    //   url: 'https://www.fjallraven.com/globalassets/catalogs/fjallraven/f2/f273/f27342/f638-555/7323450489403_ss19_srrf_keb_52_fjaellraeven_21.jpg?width=312&height=312&mode=BoxPad&bgcolor=fff&quality=80'
    // },
    // {
    //   id: 8,
    //   title: 'Praesent velit ante',
    //   price: '$250',
    //   url: 'https://www.fjallraven.com/globalassets/catalogs/fjallraven/f8/f822/f82268/f235/7323450412913_ss18_a_abisko_hike_shirt_ss_21.jpg?width=312&height=312&mode=BoxPad&bgcolor=fff&quality=80'
    // }
  ]

  return sampleProducts;




}




module.exports.createSampleData = createSampleData;