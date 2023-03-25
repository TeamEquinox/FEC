import React, { useState, useEffect } from 'react';
import StarRating from '../../starRatings'

const OverallReview = ({ meta }) => {

  let rating = (Number(meta.ratings[1] ?? 0) * 1) + (Number(meta.ratings[2] ?? 0) * 2) + (Number(meta.ratings[3] ?? 0) * 3) +
    (Number(meta.ratings[4] ?? 0) * 4) + (Number(meta.ratings[5] ?? 0) * 5);
  let totalPossibleRating = ((Number(meta.ratings[1] ?? 0) + Number(meta.ratings[2] ?? 0) + Number(meta.ratings[3] ?? 0) +
    Number(meta.ratings[4] ?? 0) + Number(meta.ratings[5] ?? 0)) * 5);
  let numOfReviews = Number(meta.ratings[1] ?? 0) + Number(meta.ratings[2] ?? 0) +
    Number(meta.ratings[3] ?? 0) + Number(meta.ratings[4] ?? 0) + Number(meta.ratings[5] ?? 0);
  let numOfStars = rating / totalPossibleRating * 5;
  let recommendCount = Number(meta.recommended['true'])

  return (
    <>
      <div style={{ width: '300px' }}>
        <h3 id="overall-rating">Overall Rating: {numOfStars.toFixed(1)}</h3>
        <StarRating rating={numOfStars} pixels={20} />
        <h5>{(recommendCount / numOfReviews * 100).toFixed(0)}% of reviews recommend this product! </h5>
      </div>
      <h5>{numOfReviews} Reviews with {recommendCount} Recommendations!</h5>
    </>
    )
}

export default OverallReview