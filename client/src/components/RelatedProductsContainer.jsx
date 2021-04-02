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

    let productId = location.href.split('//').join('').split('/')[1];

    //axios.get(`${window.location.protocol + '//' + window.location.host}/related-products/${productId}`)

    axios.get(`/related-products/${productId}`)
      .then((response) => {
        let displayProducts = response.data.slice(0, 4);

        this.setState({
          relatedproducts: displayProducts
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="related-products-root">
        <h3 className="related-products-header">RELATED PRODUCTS</h3>


        <div className="related-products-container">
          {this.state.relatedproducts.map(product => <RelatedProduct key={product.id} product={product} />)}
        </div>
      </div>
    );
  }
}

export default RelatedProductsContainer;