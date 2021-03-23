import React from 'react';
import ReactDOM from 'react-dom';

const RelatedProduct = function ({product}) {

  return (
    <div className="related-product-single">
      <span className="related-product-img" crossOrigin='true'><img src={product.url} /></span>

      <div className="product-info">
      <h4 className="related-product-title">{product.title}</h4>
      <span className="related-product-price">{product.price}</span>
      </div>
    </div>
  )
}

export default RelatedProduct;