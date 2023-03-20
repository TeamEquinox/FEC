import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { CgLoadbar } from 'react-icons/cg';

import StarRating from '../../starRatings'


const IndividualReview = ({ reviews }) => {


  // console.log('reviews in individualReviews: ', reviews)
  let reviewArr = []
  if (reviews !== undefined) {
    reviewArr = reviews;
  }


  return (
    <>
      <div className="individual-reviews-container">

        {reviewArr.map((review) => (
          <div className="individual-reviews">
            <StarRating rating={review.rating} pixels={15} topMargin={-5} leftMargin={10} className="individual-reviews-stars" />
            <p className="individual-reviews-date">
              {new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <h3 className="individual-reviews-header">
              {review.summary !== "" ? review.summary : "No Title"}
            </h3>
            <p className="individual-reviews-response">{review.response ?? ''}</p>
            <p className="individual-reviews-body">{review.body ?? ''}</p>
            <p className="individual-reviews-user">By: {review.reviewer_name ?? 'Anonymous'}</p>
            {/* <p className="individual-reviews-photos">{review.photos ?? ''}</p> */}
            <p className="individual-reviews-recommend">
              {review.recommend !== true ? "I recommend this product" : ""}
            </p>
            <p className="individual-reviews-helpfulness">
              {review.helpfulness === 1 ? '1 person' : review.helpfulness + ' people'} found this review helpful
            </p>
          </div>
        ))}
      </div>
    </>
  )

};

export default IndividualReview;
