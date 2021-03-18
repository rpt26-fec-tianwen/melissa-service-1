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
        let displayProducts = response.slice(0, 4);

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
        <button className="previous slick-arrow" type="button" aria-label="Previous"><svg viewBox="0 0 100 100"><path d="M33.8352105,100 C31.4906934,99.997936 29.2429547,99.0649124 27.5861629,97.4060557 C24.1379457,93.9535448 24.1379457,88.3604714 27.5861629,84.9079605 L62.6044109,49.8897124 L27.5861629,14.8714644 C24.3395013,11.3872106 24.4353002,5.95761395 27.8028539,2.59006023 C31.1704076,-0.777493487 36.6000043,-0.873292384 40.0842581,2.37336919 L87.6006014,49.8897124 L40.0842581,97.4060557 C38.4274663,99.0649124 36.1797276,99.997936 33.8352105,100 L33.8352105,100 Z" className="arrow"></path></svg></button>
          {this.state.relatedproducts.map(product => <RelatedProduct key={product.id} product={product} />)}
        </div>
      </div>
    );
  }
}

export default RelatedProductsContainer;