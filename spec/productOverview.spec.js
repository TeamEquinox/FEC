/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import product from './mochData.js';

import ProductOverview from '../client/src/product/ProductOverview.jsx';

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

describe('ProductOverview', () => {
  test('renders ProductOverview component', () => {
    const { getByText } = render(<ProductOverview product={product.product} />);
    expect(screen.getByText(/Read all reviews/i)).toBeInTheDocument();

    // screen.debug();
  });
});