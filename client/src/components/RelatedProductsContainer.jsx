import React from 'react';
import ReactDOM from 'react-dom';
import RelatedProduct from './RelatedProduct.jsx';

const axios = require('axios');


class RelatedProductsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedproducts: []
    }


  }



  componentDidMount() {

    async function getData() {

      const response = await axios.get('http://localhost:8003/related-products/55');

      return response.data;
    }

    getData()
      .then((response) => {
        console.log('in the getData then block ', response);

        this.setState({
          relatedproducts: response
        });

        createProductList();

      })
      .catch(error => {
        console.log('Catch block in getData promise chain', error);
      });

  }

  render() {
    return (
      <div>
        <h3>Related Products</h3>

        {this.state.relatedproducts.map( product => <RelatedProduct product={product} />)}

      </div>
    );
  }
}


export default RelatedProductsContainer;