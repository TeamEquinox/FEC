/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import RelatedProducts from '../client/src/related/RelatedProducts';
// import Products from '../client/src/related/Products.jsx';
import { product, relatedData } from './mochData';

/*
A "describe" block can be used to group together multiple tests
which check the same nodule or function.
 */
describe('Example tests', () => {
  const add = (num1, num2) => num1 + num2;
  // Individual tests can be run using the "it" or "test" methods, they are aliased and are equivalent
  it('Should add small numbers', () => {
    /* This test suite is written in Jest. There are many more methods other than "toBe"
    Go to: https://jestjs.io/docs/en/expect
    to find more options if "toBe" doesn't fit your use case.
    */
    expect(add(1, 1)).toBe(2);
  });

  // In addition to expected, "happy path", behaviour as above, you should also test your edge cases
  it('Should return Infinity for numbers of type Number which are very large', () => {
    expect(add(1.6E310, 1)).toBe(Infinity);
  });
});
/*
We start here. 1 describe block per feature tested.
We can use the 'only' method to only run the tests we want. https://jestjs.io/docs/en/api#describeonlyname-fn
*/

// test('use jsdom in this test file', () => {
//   const element = document.createElement('div');
//   expect(element).not.toBeNull();
// });

// test('renders component with text ', () => {
//   const { getByText } = render(<RelatedProducts product={products} />);
//   expect(getByText(/Name/)).not.toBeNull();
//   screen.debug();
// });

describe('Related Product text', () => {
  it('renders component with text Related Products', () => {
    const mochFn = jest.fn();
    const a = new mochFn();
    // const b = a.mockReturnValue([]);
    render(<RelatedProducts product={product} relatedData={relatedData} update={a} compare={a} updateProduct={a} outfit={relatedData} setoutfit={a}/>);
    // expect(screen.getByText(/Related Products/)).toBeInTheDocument();
    screen.debug;
  });

//   it('Displays the related products component with text Category', () => {
//     render(<RelatedProducts product={products} />);
//     expect(screen.getByText(/Category/)).toBeInTheDocument();
//     // screen.debug();
//   });

//   it('renders component text Name', () => {
//     render(<RelatedProducts product={products} />);
//     expect(screen.getByText(/Name/)).toBeInTheDocument();
//   });

//   it('renders component text Price', () => {
//     render(<RelatedProducts product={products} />);
//     // expect(screen.getByText(/Price/)).toBeInTheDocument();
//     screen.debug;
//   });

//   it('renders component text Your Outfit', () => {
//     render(<RelatedProducts product={products} />);
//     expect(screen.getByText(/Your Outfit/)).toBeInTheDocument();
//   });
});

// describe('Related Products roles', () => {
//   it('renders component text Your Outfit', () => {
//     render(<RelatedProducts product={products}/>)
//     expect(screen.getByRole('img')).toBeInTheDocument();
//   })
// });
