/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render as renderScreen, screen } from '@testing-library/react';
import { render as renderFireEvent, fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import RatingBreakdown from '../client/src/reviews/summary/ratingBreakdown.jsx';
import product from './mochData.js';

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

describe('RatingBreakdown renders', () => {
  const breakdown = product.product[3];
  const reviews = product.product[2];
  it('renders RatingBreakdown component', () => {
    // console.log('here is the log: ', breakdown, reviews)
    const { getByText } = renderScreen(<RatingBreakdown breakdown={breakdown} reviews={reviews} />);
    expect(getByText(/Overall Rating/i)).toBeInTheDocument();
  });

  it('detects a click on a the stars-bar-container', () => {
    const handleClick = jest.fn(); // create a mock function
    const { getByTestId } = renderFireEvent(<div data-testid="stars-bar-container" onClick={handleClick}>Click me</div>);
    const div = getByTestId("stars-bar-container"); // select the div by its attribute
    fireEvent.click(div);
    expect(handleClick).toHaveBeenCalledTimes(1); // assert that the mock function was called once
  });
});
