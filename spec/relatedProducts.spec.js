/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react'; 
import { toBeInTheDocument } from '@testing-library/jest-dom';
import RelatedProducts from './client/src/related/RelatedProducts.jsx'; 
import product from './mochData.js';

/* 
A "describe" block can be used to group together multiple tests
which check the same nodule or function.
 */
describe("Example tests", function(){
  var add = (num1, num2) => {
    return num1 + num2;
  }
  // Individual tests can be run using the "it" or "test" methods, they are aliased and are equivalent
  it("Should add small numbers", function(){
    /* This test suite is written in Jest. There are many more methods other than "toBe"
    Go to: https://jestjs.io/docs/en/expect
    to find more options if "toBe" doesn't fit your use case.
    */
    expect(add(1,1)).toBe(2);
  });
  
  // In addition to expected, "happy path", behaviour as above, you should also test your edge cases
  it("Should return Infinity for numbers of type Number which are very large", function(){
    expect(add(1.6E310, 1)).toBe(Infinity);
  });
});
/*
We start here. 1 describe block per feature tested.
We can use the 'only' method to only run the tests we want. https://jestjs.io/docs/en/api#describeonlyname-fn
*/






test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

test('renders component', () => {
  const { getByText } = render(<RelatedProducts/>)
  expect(getByText(/Name/)).not.toBeNull();
  // screen.debug();
})

describe('RelatedProduct', () => {
  
  it('Displays the related products component', () => {
    render(<RelatedProducts product={product}/>);
    expect(screen.getByText(/Category/)).toBeInTheDocument();
    // screen.debug();
  })

  it('renders component', () => {
    render(<RelatedProducts product={product}/>)
    expect(screen.getByText(/Name/)).toBeInTheDocument();
  })
  
  it('renders component', () => {
    render(<RelatedProducts product={product}/>)
    expect(screen.getByText(/Price/)).toBeInTheDocument();
  })

})