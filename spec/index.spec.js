/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render as renderScreen, screen, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import OverallReview from '../client/src/reviews/components/OverallReview';
import ReviewList from '../client/src/reviews/components/ReviewList';
import product from './mochData';

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

describe('RatingBreakdown renders', () => {
  const meta = product.product[3];
  const reviews = product.product[2];
  const mockReviews = [
    { review_id: 1, rating: 4, date: '2022-03-25T00:00:00.000Z', summary: 'Great product!', body: 'I really loved this', helpfulness: 5, recommend: true },
    { review_id: 2, rating: 2, date: '2022-03-24T00:00:00.000Z', summary: 'Disappointing', body: 'I was really disappointed', helpfulness: 2, recommend: false },
    { review_id: 3, rating: 5, date: '2022-03-23T00:00:00.000Z', summary: 'Amazing!', body: 'This product exceeded expectations', helpfulness: 8, recommend: true },
    { review_id: 4, rating: 3, date: '2022-03-22T00:00:00.000Z', summary: 'Just okay', body: 'This product was okay', helpfulness: 1, recommend: true },
  ];
  const review = {
    review_id: 1,
    rating: 4,
    date: '2022-03-25T00:00:00.000Z',
    summary: 'Great product!',
    body: 'I really loved this',
    helpfulness: 5,
    recommend: true,
  };

  it('renders OverallReview component', () => {
    // console.log('here is the log: ', breakdown, reviews)
    const { getByText } = renderScreen(<OverallReview meta={meta} />);
    expect(getByText(/Overall Rating/i)).toBeInTheDocument();
  });

  it('detects a click on the stars-bar-container', () => {
    const handleClick = jest.fn(); // create a mock function
    renderScreen(<div data-testid="stars-bar-container" onClick={handleClick}>Click me</div>);
    const div = screen.getByTestId('stars-bar-container'); // select the div by its attribute
    fireEvent.click(div);
    expect(handleClick).toHaveBeenCalledTimes(1); // assert that the mock function was called once
  });

  it('renders ReviewList component', () => {
    render(<ReviewList reviews={mockReviews} />);
    expect(screen.getAllByTestId('individual-review').length).toBe(2);
  });

  it('clicking "More reviews" adds two more reviews', () => {
    render(<ReviewList reviews={mockReviews} />);
    expect(screen.getAllByTestId('individual-review').length).toBe(2);
    const moreReviewsButton = screen.getByText(/More reviews.../i);
    fireEvent.click(moreReviewsButton);
    expect(screen.getAllByTestId('individual-review').length).toBe(4);
  });

  it('detects a click on the helpfulreview button', () => {
    const handleHelpfulClick = jest.fn();
    renderScreen(
      <div data-testid="helpfulreview-button" onClick={handleHelpfulClick}>
        <button>Yes</button>
        <span> ({review.helpfulness})</span>
      </div>
    );
    const button = screen.getByTestId('helpfulreview-button');
    fireEvent.click(button);
    expect(handleHelpfulClick).toHaveBeenCalledTimes(1);
  });
});
