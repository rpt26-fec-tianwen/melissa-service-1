import React from 'react';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import RelatedProductsContainer from '../src/components/RelatedProductsContainer.jsx';
import RelatedProduct from '../src/components/RelatedProduct.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('RelatedProductsContainer', () => {

  it('Should render a header with a nested div', () => {
    const wrap = shallow(<RelatedProductsContainer />);
    const text = wrap.find('h3 div');
  });

  it('Should render the headline Related Products', () => {
    const wrap = shallow(<RelatedProductsContainer />);
    const text = wrap.find('h3');
    expect(text.text()).toBe('RELATED PRODUCTS');
  });

});


describe('RelatedProduct', () => {

  const product = {
    url: 'http://www.google.com',
    price: '$400',
    title: 'Fancy Mountain Jacket'
  }

  it('Should render product image URL correctly', () => {
    const wrap = shallow(<RelatedProduct product={product} />);
    expect(wrap.find('img').prop('src')).toEqual('http://www.google.com');
  });

  it('Should render product title correctly', () => {
    const wrap = shallow(<RelatedProduct product={product} />);
    const text = wrap.find('h4.related-product-title');
    expect(text.text()).toBe('Fancy Mountain Jacket');
  });

  it('Should render product price correctly', () => {
    const wrap = shallow(<RelatedProduct product={product} />);
    const text = wrap.find('span.related-product-price');
    expect(text.text()).toBe('$400');
  });

});

