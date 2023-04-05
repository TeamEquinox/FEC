/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import product from './mochData.js';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import Style from '../client/src/product/Style.jsx';
import ProductOverview from '../client/src/product/ProductOverview.jsx';

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

test('renders reviews in ProductOverview component', () => {
  const { getByText } = render(<ProductOverview product={product.product} />);
  expect(screen.getByText(/Read all/i)).not.toBeNull();
  // screen.debug();
});

describe('ProductOverview', () => {
  // it('renders ProductOverview component', () => {
  //   const { getByText } = render(<ProductOverview product={product.product} />);
  //   expect(screen.getByText(/Read all reviews/i)).toBeInTheDocument();
  //   // screen.debug();
  // });
  it('renders style', () => {
    render(<ProductOverview product={product.product}/>)
    expect(screen.getByText(/Style/i)).toBeInTheDocument();
  })
  it('renders add to cart button', () => {
    render(<ProductOverview product={product.product}/>)
    expect(screen.getByText(/Add to cart/i)).toBeInTheDocument();
  })
  it('renders the size selector', () => {
    render(<ProductOverview product={product.product}/>)
    expect(screen.getByText(/Select Size/i)).toBeInTheDocument();
  })
  it('renders the quantity selector', () => {
    render(<ProductOverview product={product.product}/>)
    expect(screen.getByText(/Quantity/i)).toBeInTheDocument();
  })
  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Style label="button__cart" onClick={handleClick} />);
    fireEvent.click(getByText('Add to cart'));
    expect(handleClick).toHaveBeenCalled();
  });

});