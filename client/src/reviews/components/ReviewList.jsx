/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { StarRating } from '../../starRatings';
import {
  postReview,
  putHelpfulReview,
  putReportReview,
} from '../helpers/userRequests';
import ReviewModal from '../helpers/ReviewModal';

function ReviewList({
  reviews,
  toggle,
  setToggle,
  productId,
  prodCharacteristics,
  prodName,
}) {
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [tempCharStorage, setTempCharStorage] = useState({});
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
    if (prodCharacteristics.length > 0) {
      const { Fit, Length, Comfort, Quality } = prodCharacteristics[0];
      reviewFormData.characteristics = {
        [Fit?.id]: Fit ? null : undefined,
        [Length?.id]: Length ? null : undefined,
        [Comfort?.id]: Comfort ? null : undefined,
        [Quality?.id]: Quality ? null : undefined,
      };
      setTempCharStorage({
        Fit: Fit?.id,
        Length: Length?.id,
        Comfort: Comfort?.id,
        Quality: Quality?.id,
        Name: prodName,
      });
    }
  }, [prodCharacteristics]);

  const moreReviews = () => {
    setReviewCount(reviewCount + 2);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const helpfulReviewHandler = (reviewId) => {
    if (!helpfulReviews.includes(reviewId)) {
      putHelpfulReview(reviewId)
        .then(() => {
          console.log('Success from putHelpfulReview');
          setToggle(!toggle);
          setHelpfulReviews([...helpfulReviews, reviewId]);
        })
        .catch((err) => {
          console.log(`error with ${reviewId} in putHelpfulReview`, err);
        });
    }
  };

  const reportReview = (reviewId) => {
    putReportReview(reviewId)
      .then(() => {
        console.log('Success from reportReview');
        setToggle(!toggle);
      })
      .catch((err) => {
        console.log(`error with ${reviewId} in reportReview`, err);
      });
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();
    reviewFormData.product_id = Number(productId);
    for (const key in reviewFormData.characteristics) {
      reviewFormData.characteristics[key] = Number(reviewFormData.characteristics[key]);
    }
    if (reviewFormData.recommend === 'false') {
      reviewFormData.recommend = false;
    } else { reviewFormData.recommend = true; }
    postReview(reviewFormData)
      .then(() => {
        setToggle(!toggle);
      })
      .catch((err) => {
        console.log('Error sending to server: ', err);
      });
    setShowModal(false);
  };

  const handleInputChange = (event, element) => {
    const { name, value, type } = event.target;
    if (type === 'radio' && name !== 'recommend') {
      setReviewFormData((prevState) => ({
        ...prevState,
        characteristics: {
          ...prevState.characteristics,
          [element]: value,
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
              {' '}
              {review.reviewer_name ?? 'Anonymous'}
            </p>
            {review.photos.length > 0 ? (
              review.photos.map((photo) => (
                <img
                  src={photo.url}
                  alt="Review"
                  key={photo.id}
                  style={{ maxWidth: '25%', height: 'auto' }}
                />
              ))
            ) : (
              <p className="individual-reviews-photos">
                {review.photos[0] ?? ''}
              </p>
            )}
            <p className="individual-reviews-recommend">
              {review.recommend === true ? 'I recommend this product' : ''}
            </p>
            <p className="individual-reviews-helpfulness">
              {review.helpfulness === 1
                ? '1 person'
                : `${review.helpfulness} people`}
              {' '}
              found this helpful
            </p>
            <button
              type="button"
              onClick={() => helpfulReviewHandler(Number(review.review_id))}
              className="helpful-review-button"
            >
              Helpful
            </button>
            <span style={{ marginLeft: '10px' }}>|</span>
            <button
              type="button"
              onClick={() => reportReview(Number(review.review_id))}
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
          tempCharStorage={tempCharStorage}
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
