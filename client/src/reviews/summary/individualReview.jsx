import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { CgLoadbar } from 'react-icons/cg';

import StarRating from '../../starRatings'


const IndividualReview = ({ reviews }) => {

  let reviewArr = []
  if (reviews !== undefined) {
    // console.log('reviews in individualReviews: ', reviews)
    reviewArr = reviews;
  }
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {reviewArr.map((review) => (
        <div key={review.review_id}>
          <StarRating rating={review.rating} pixels={10} />
          <h3>{review.summary ?? 'No Summary'}</h3>
          <p>{review.reviewer_name ?? 'Anonymous'}</p>
          <p>{review.body ?? 'No Review'}</p>
        </div>
      ))}
    </>
  )

};

export default IndividualReview;
