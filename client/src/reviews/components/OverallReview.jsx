/* eslint-disable react/prop-types */
import React from 'react';
import { StarRating } from '../../starRatings';

function OverallReview({ meta }) {
  const rating = (Number(meta.ratings[1] ?? 0) * 1)
    + (Number(meta.ratings[2] ?? 0) * 2)
    + (Number(meta.ratings[3] ?? 0) * 3)
    + (Number(meta.ratings[4] ?? 0) * 4)
    + (Number(meta.ratings[5] ?? 0) * 5);
  const totalPossibleRating = ((Number(meta.ratings[1] ?? 0)
    + Number(meta.ratings[2] ?? 0)
    + Number(meta.ratings[3] ?? 0)
    + Number(meta.ratings[4] ?? 0)
    + Number(meta.ratings[5] ?? 0)) * 5);
  const numOfReviews = Number(meta.ratings[1] ?? 0)
    + Number(meta.ratings[2] ?? 0)
    + Number(meta.ratings[3] ?? 0)
    + Number(meta.ratings[4] ?? 0)
    + Number(meta.ratings[5] ?? 0);
  const numOfStars = (rating / totalPossibleRating) * 5;
  const recommendCount = Number(meta.recommended.true);

  return (
    <>
      <div style={{ width: '400px', fontSize: '20px' }}>
        <h3 id="overall-rating">
          Overall Rating:
          {' '}
          {numOfStars.toFixed(1)}
        </h3>
        <StarRating rating={numOfStars} pixels={20} />
        <h4>
          {((recommendCount / numOfReviews) * 100).toFixed(0)}
          % of reviews recommend this product!
          {' '}
        </h4>
      </div>
      <h5>
        {numOfReviews}
        {' '}
        Reviews with
        {' '}
        {recommendCount}
        {' '}
        Recommendations!
      </h5>
    </>
  );
}

export default OverallReview;
