/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StarRating } from '../../starRatings';

function ReviewList({ reviews }) {
  const [reviewCount, setReviewCount] = useState(2);

  let reviewArr = [];
  if (Array.isArray(reviews)) {
    reviewArr = reviews;
  }

  const moreReviews = () => {
    setReviewCount(reviewCount + 2);
  };

  const helpfulReview = () => {
    // console.log('user clicked helpfulReview!');
  };

  const reportReview = () => {
    // console.log('user clicked reportReview!');
  };

  const submitReview = () => {
    // console.log('user clicked submitReview!');
  };

  return (
    <>
      <div className="individual-reviews-container">
        {reviewArr.slice(0, reviewCount).map((review) => (
          <div key={review.review_id} className="individual-reviews">
            <StarRating rating={review.rating} pixels={15} topMargin={-5} leftMargin={10} className="individual-reviews-stars" />
            <p className="individual-reviews-date">
              {new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <h3 className="individual-reviews-header">
              {review.summary !== '' ? review.summary : 'No Title'}
            </h3>
            <p className="individual-reviews-response">{review.response ?? ''}</p>
            <p className="individual-reviews-body">{review.body ?? ''}</p>
            <p className="individual-reviews-user">
              By:
              {review.reviewer_name ?? 'Anonymous'}
            </p>
            {/* <p className="individual-reviews-photos">{review.photos ?? ''}</p> */}
            <p className="individual-reviews-recommend">
              {review.recommend !== true ? 'I recommend this product' : ''}
            </p>
            <p className="individual-reviews-helpfulness">
              {review.helpfulness === 1 ? '1 person' : `${review.helpfulness} people`}
              {' '}
              found this helpful
            </p>
            {/* {reviewCount <= reviewArr.length && ( */}
            <button type="button" onClick={() => helpfulReview()} className="helpful-review-button">Helpful</button>
            {/* )} */}
            <span style={{ marginLeft: '10px' }}>|</span>
            {/* {reviewCount <= reviewArr.length && ( */}
            <button type="button" onClick={() => reportReview()} className="report-review-button">Report</button>
            {/* )} */}
          </div>
        ))}
      </div>

      <button type="button" onClick={() => submitReview()} className="submit-reviews-button">Submit Review</button>
      <span style={{ marginLeft: '10px' }}>|</span>
      {reviewCount <= reviewArr.length && (
        <button type="button" onClick={() => moreReviews()} className="more-reviews-button">More reviews...</button>
      )}
    </>
  );
}

export default ReviewList;
