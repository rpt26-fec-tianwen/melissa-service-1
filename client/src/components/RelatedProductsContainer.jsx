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
      let productId = location.href.split('//').join('').split('/')[1];

      const response = await axios.get(`http://localhost:8003/related-products/${productId}`);
      return response.data;
    }

    getData()
      .then((response) => {
        this.setState({
          relatedproducts: response
        });
      })
      .catch(error => {
        console.log('Catch block in getData promise chain', error);
      });
  }

  render() {
    return (
      <div>
        <h3 className="recommended-product--header">RELATED PRODUCTS</h3>

        <div className="related-products-container">
          {this.state.relatedproducts.map(product => <RelatedProduct key={product.id} product={product} />)}
        </div>
      </div>
    );
  }
}

export default RelatedProductsContainer;