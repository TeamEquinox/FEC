import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { CgLoadbar } from 'react-icons/cg';

import StarRating from '../../starRatings'

const IndividualReview = ({ reviews }) => {

  const [reviewCount, setReviewCount] = useState(2);

  // console.log('reviews in individualReviews: ', reviews)
  let reviewArr = []
  if (reviews !== undefined) {
    reviewArr = reviews;
  }

  const moreReviews = () => {
    console.log('user clicked moreReviews!')
    setReviewCount(reviewCount + 2)
  }

  const helpfulReview = () => {
    console.log('user clicked helpfulReview!')

  }

  const reportReview = () => {
    console.log('user clicked reportReview!')

  }

  const submitReview = () => {
    console.log('user clicked submitReview!')

  }

  return (
    <>
      <div className="individual-reviews-container">
        {reviewArr.slice(0, reviewCount).map((review, index) => (
          <div key={index} className="individual-reviews">
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
              {review.helpfulness === 1 ? '1 person' : review.helpfulness + ' people'} found this helpful
            </p>
            {/* {reviewCount <= reviewArr.length && ( */}
            <button onClick={() => helpfulReview()} className="helpful-review-button">Helpful</button>
            {/* )} */}
            <span style={{ marginLeft: '10px' }}>|</span>
            {/* {reviewCount <= reviewArr.length && ( */}
            <button onClick={() => reportReview()} className="report-review-button">Report</button>
            {/* )} */}
          </div>
        ))}
      </div>

      <button onClick={() => submitReview()} className="submit-reviews-button">Submit Review</button>
      {reviewCount <= reviewArr.length && (
        <button onClick={() => moreReviews()} className="more-reviews-button">Show more reviews...</button>
      )}
    </>
  )

};

export default IndividualReview;
