import React from 'react';
import ReactDOM from 'react-dom';

const RelatedProduct = function ({product}) {

  console.log('props in the child component: ', product);


  return (
    <div className="related-product-container">
      <p>{product.title}</p>
      <p>{product.price}</p>
      <p><img src={product.url} /></p>
    </div>
  )
}

export default RelatedProduct;