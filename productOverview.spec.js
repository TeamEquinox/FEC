/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import ProductOverview from './client/src/product/ProductOverview.jsx';


test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

describe('true is truthy and false is falsy', () => {
  it('true is truthy', () => {
    expect(true).toBe(true);
  });

  it('false is falsy', () => {
    expect(false).toBe(false);
  });
});

describe('ProductOverview', () => {
  test('renders ProductOverview component', async () => {
    const { getByText } = render(<ProductOverview />);
    expect(getByText(/Read all reviews/i)).toBeInTheDocument();
    screen.debug();
  });
});