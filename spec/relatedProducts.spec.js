/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import RelatedProducts from '../client/src/related/RelatedProducts';
import Outfits from '../client/src/related/Outfits';
import Products from '../client/src/related/Products';
import Modal from '../client/src/related/Modal';
import {
  product, relatedData, modalCompare, outfitCompare,
} from './mochData';

/*
A "describe" block can be used to group together multiple tests
which check the same nodule or function.
 */
// describe('Example tests', () => {
//   const add = (num1, num2) => num1 + num2;
//   // Individual tests can be run using the "it" or "test" methods,
// they are aliased and are equivalent
//   it('Should add small numbers', () => {
//     /* This test suite is written in Jest. There are many more methods other than "toBe"
//     Go to: https://jestjs.io/docs/en/expect
//     to find more options if "toBe" doesn't fit your use case.
//     */
//     expect(add(1, 1)).toBe(2);
//   });

//   // In addition to expected, "happy path",
// behaviour as above, you should also test your edge cases
//   it('Should return Infinity for numbers of type Number which are very large', () => {
//     expect(add(1.6E310, 1)).toBe(Infinity);
//   });
// });
/*
We start here. 1 describe block per feature tested.
We can use the 'only' method to only run the tests we want. https://jestjs.io/docs/en/api#describeonlyname-fn
*/

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

test('renders component with text ', () => {
  const mochFn = jest.fn();
  const { getAllByText } = render(<RelatedProducts
    product={product}
    relatedData={relatedData}
    update={mochFn}
    compare={relatedData}
    updateProduct={mochFn}
    outfit={relatedData}
    setoutfit={mochFn}
  />);
  expect(getAllByText(/Name/)[0]).not.toBeNull();
  // screen.debug();
});

describe('Related Product Component', () => {
  it('renders component with text Related Products', () => {
    const mochFn = jest.fn();
    render(<RelatedProducts
      product={product}
      relatedData={relatedData}
      update={mochFn}
      compare={relatedData}
      updateProduct={mochFn}
      outfit={relatedData}
      setoutfit={mochFn}
    />);
    expect(screen.getByText(/Related Products/)).toBeInTheDocument();

    // screen.debug();
  });

  it('Displays the related products component with text Category', () => {
    const mochFn = jest.fn();
    render(<RelatedProducts
      product={product}
      relatedData={relatedData}
      update={mochFn}
      compare={relatedData}
      updateProduct={mochFn}
      outfit={relatedData}
      setoutfit={mochFn}
    />);
    expect(screen.getAllByText(/Category/)[0]).toBeInTheDocument();
    // screen.debug();
  });

  it('renders component text Name', () => {
    const mochFn = jest.fn();
    render(<RelatedProducts
      product={product}
      relatedData={relatedData}
      update={mochFn}
      compare={relatedData}
      updateProduct={mochFn}
      outfit={relatedData}
      setoutfit={mochFn}
    />);
    expect(screen.getAllByText(/Name/)[0]).toBeInTheDocument();
  });

  it('renders component text Price', () => {
    const mochFn = jest.fn();
    render(<RelatedProducts
      product={product}
      relatedData={relatedData}
      update={mochFn}
      compare={relatedData}
      updateProduct={mochFn}
      outfit={relatedData}
      setoutfit={mochFn}
    />);
    expect(screen.getAllByText(/\$/)[0]).toBeInTheDocument();
    // screen.debug;
  });

  it('renders component text Your Outfit', () => {
    const mochFn = jest.fn();
    render(<RelatedProducts
      product={product}
      relatedData={relatedData}
      update={mochFn}
      compare={relatedData}
      updateProduct={mochFn}
      outfit={relatedData}
      setoutfit={mochFn}
    />);
    expect(screen.getByText(/Your Outfit/)).toBeInTheDocument();
  });
});

describe('Related Products roles', () => {
  it('renders component text Your Outfit', () => {
    const mochFn = jest.fn();
    render(<RelatedProducts
      product={product}
      relatedData={relatedData}
      update={mochFn}
      compare={relatedData}
      updateProduct={mochFn}
      outfit={relatedData}
      setoutfit={mochFn}
    />);
    expect(screen.getAllByAltText(/RelatedImage/)[0]).toBeInTheDocument();
  });
});

describe('Outfit List Component', () => {
  it('Checks if Outfit List component is rendering the text Your Outfit', () => {
    const mochFn = jest.fn();
    render(<Outfits
      product={product}
      data={outfitCompare}
      setoutfit={mochFn}
    />);
    // screen.debug();
    expect(screen.getByText(/Your Outfit/)).toBeInTheDocument();
  });
  it('Checks if Outfit List component is rendering the text Add to Outfit', () => {
    const mochFn = jest.fn();
    render(<Outfits
      product={product}
      data={outfitCompare}
      setoutfit={mochFn}
    />);
    // screen.debug();
    expect(screen.getByText(/Add to Outfit/)).toBeInTheDocument();
  });
  it('Checks if Outfit List card is rendering the text Category', () => {
    const mochFn = jest.fn();
    render(<Outfits
      product={product}
      data={outfitCompare}
      setoutfit={mochFn}
    />);
    expect(screen.getAllByText(/Category/)[0]).toBeInTheDocument();
    // screen.debug();
  });

  it('Checks if Outfit List card is rendering the text Name', () => {
    const mochFn = jest.fn();
    render(<Outfits
      product={product}
      data={outfitCompare}
      setoutfit={mochFn}
    />);
    expect(screen.getAllByText(/Name/)[0]).toBeInTheDocument();
  });

  it('Checks if Outfit List card exists', () => {
    const mochFn = jest.fn();
    render(<Outfits
      product={product}
      data={outfitCompare}
      setoutfit={mochFn}
    />);
    expect(screen.getAllByText(/\$/)[0]).toBeInTheDocument();
    // screen.debug;
  });
  it('Checks if Outfit List card is removed when x icon is clicked', () => {
    const mochFn = jest.fn();
    render(<Outfits
      product={product}
      data={outfitCompare}
      // data={[]}
      setoutfit={mochFn}
    />);
    // const button = screen.getByTestId('addOutfit');
    // expect(button).not.toBeNull();
    // fireEvent.click(button);
    const outfitList2 = screen.getAllByText(/Category/);
    // const button2 = screen.getAllByTestId('outfitIcon')[2];
    // fireEvent.click(button2);
    expect(outfitList2.length).toEqual(2);

    screen.debug();
  });
});

describe('Product Component', () => {
  it('renders component with text Related Products', () => {
    const mochFn = jest.fn();
    render(<Products
      product={product}
      relatedData={relatedData}
      updates={mochFn}
      updateProduct={mochFn}
    />);
    // screen.debug();
    expect(screen.getByText(/Related Products/)).toBeInTheDocument();
  });
  it('renders component with text Name', () => {
    const mochFn = jest.fn();
    render(<Products
      product={product}
      relatedData={relatedData}
      updates={mochFn}
      updateProduct={mochFn}
    />);
    // screen.debug();
    expect(screen.getAllByText(/Name/)[0]).toBeInTheDocument();
  });
  it('renders component with text Category', () => {
    const mochFn = jest.fn();
    render(<Products
      product={product}
      relatedData={relatedData}
      updates={mochFn}
      updateProduct={mochFn}
    />);
    // screen.debug();
    expect(screen.getAllByText(/Category/)[0]).toBeInTheDocument();
  });
  it('renders component with text $ symbol', () => {
    const mochFn = jest.fn();
    render(<Products
      product={product}
      relatedData={relatedData}
      updates={mochFn}
      updateProduct={mochFn}
    />);
    // screen.debug();
    expect(screen.getAllByText(/\$/)[0]).toBeInTheDocument();
  });
});

describe('Modal Component', () => {
  it('Tests if component renders after click event', async () => {
    const mochFn = jest.fn();
    render(<RelatedProducts
      product={product}
      relatedData={relatedData}
      update={mochFn}
      compare={modalCompare}
      updateProduct={mochFn}
      outfit={relatedData}
      setoutfit={mochFn}
    />);
    const button = screen.getAllByTestId('iconId')[0];
    expect(screen.queryByText(/Compare/)).toBeNull();
    fireEvent.click(button);

    // screen.debug();
    await expect(screen.getByText(/Compare/)).toBeInTheDocument();
  });

  it('Tests if Outfit list is no longer rendrerd after X is clicked', async () => {
    const mochFn = jest.fn();
    render(<RelatedProducts
      product={product}
      relatedData={relatedData}
      update={mochFn}
      compare={modalCompare}
      updateProduct={mochFn}
      outfit={relatedData}
      setoutfit={mochFn}
    />);
    const button = screen.getAllByTestId('iconId')[0];
    expect(screen.queryByText(/Compare/)).toBeNull();
    fireEvent.click(button);
    const button2 = screen.getByRole('button');
    await expect(screen.getByText(/Compare/)).toBeInTheDocument();
    fireEvent.click(button2);
    await expect(screen.queryByText(/Compare/)).toBeNull();
    // screen.debug();
  });
});
