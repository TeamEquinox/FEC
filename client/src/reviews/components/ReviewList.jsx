/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { StarRating } from '../../starRatings';
import { postHelpfulReview } from '../helpers/userRequests';
import ReviewModal from '../helpers/ReviewModal';

function ReviewList({ reviews, productId, prodCharacteristics }) {
  console.log(prodCharacteristics[0]);
  const [reviewCount, setReviewCount] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    product_id: '',
    rating: '',
    summary: '',
    body: '',
    recommend: false,
    name: '',
    email: '',
    photos: [],
    characteristics: {
      Fit: {},
      Length: {},
      Comfort: {},
      Quality: {},
    },
  });
  let reviewArr = [];
  if (Array.isArray(reviews)) {
    reviewArr = reviews;
  }

  useEffect(() => {
    reviewFormData.characteristics.Fit.id = prodCharacteristics[0].Fit.id;
    reviewFormData.characteristics.Length.id = prodCharacteristics[0].Length.id;
    reviewFormData.characteristics.Comfort.id = prodCharacteristics[0].Comfort.id;
    reviewFormData.characteristics.Quality.id = prodCharacteristics[0].Quality.id;
    reviewFormData.characteristics.Fit.value = '';
    reviewFormData.characteristics.Length.value = '';
    reviewFormData.characteristics.Comfort.value = '';
    reviewFormData.characteristics.Quality.value = '';
  }, [prodCharacteristics]);

  const moreReviews = () => {
    setReviewCount(reviewCount + 2);
  };

  const helpfulReviewHandler = (reviewId) => {
    console.log(`/reviews/${reviewId}/helpful`);
    postHelpfulReview(reviewId)
      .then((response) => {
        console.log('Success from helpfulReviewHandler: ', response);
      })
      .catch((err) => {
        console.log(`error with ${reviewId} in ReviewList`, err);
      });
  };

  const reportReview = () => {
    // console.log('user clicked reportReview!');
  };

  const handleShowModal = () => {
    console.log('user clicked submitReview!');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();
    reviewFormData.product_id = productId;
    console.log('reviewFormData: ', reviewFormData);
    setShowModal(false);
  };

  const handleInputChange = (event, element) => {
    const { name, value, type } = event.target;
    console.log(name);
    if (type === 'radio' && name !== 'recommend') {
      setReviewFormData((prevState) => ({
        ...prevState,
        characteristics: {
          ...prevState.characteristics,
          [element]: {
            ...prevState.characteristics[element],
            value,
          },
        },
      }));
    } else {
      setReviewFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <div className="individual-reviews-container">
        {reviewArr.slice(0, reviewCount).map((review) => (
          <div
            key={review.review_id}
            className="individual-reviews"
            data-testid="individual-review"
          >
            <StarRating
              rating={review.rating}
              pixels={15}
              topMargin={-5}
              leftMargin={10}
              className="individual-reviews-stars"
            />
            <p className="individual-reviews-date">
              {new Date(review.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <h3 className="individual-reviews-header">
              {review.summary !== '' ? review.summary : 'No Title'}
            </h3>
            <p className="individual-reviews-response">
              {review.response ?? ''}
            </p>
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
              {review.helpfulness === 1
                ? '1 person'
                : `${review.helpfulness} people`}
              {' '}
              found this helpful
            </p>
            {/* {reviewCount <= reviewArr.length && ( */}
            <button
              type="button"
              onClick={() => helpfulReviewHandler(Number(review.review_id))}
              className="helpful-review-button"
            >
              Helpful
            </button>
            {/* )} */}
            <span style={{ marginLeft: '10px' }}>|</span>
            {/* {reviewCount <= reviewArr.length && ( */}
            <button
              type="button"
              onClick={() => reportReview()}
              className="report-review-button"
            >
              Report
            </button>
            {/* )} */}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleShowModal}
        className="submit-reviews-button"
      >
        Submit Review
      </button>
      {showModal ? (
        <ReviewModal
          show={showModal}
          setShowModal={setShowModal}
          handleClose={handleCloseModal}
          handleSubmit={handleSubmitReview}
          handleInputChange={handleInputChange}
          formData={reviewFormData}
        />
      ) : null}
      <span style={{ marginLeft: '10px' }}>|</span>
      {reviewCount <= reviewArr.length && (
        <button
          type="button"
          onClick={() => moreReviews()}
          className="more-reviews-button"
        >
          More reviews...
        </button>
      )}
    </>
  );
}

export default ReviewList;
