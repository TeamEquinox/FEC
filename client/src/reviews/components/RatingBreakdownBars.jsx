/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

// displays the rating bars and handlers clicks to send which bar/rating is clicked to set state
function RatingBreakdownBars({
  meta, reviews, setDisplayedReviews,
}) {
  const [barFilters, setBarFilters] = useState([]); // stars clicked so far for filtering

  const reviewList = reviews.results;
  const reviewListCopy = reviews.results;
  const numOfReviews = Number(meta.ratings[1] ?? 0) + Number(meta.ratings[2] ?? 0)
    + Number(meta.ratings[3] ?? 0) + Number(meta.ratings[4] ?? 0) + Number(meta.ratings[5] ?? 0);

  const bar5 = document.getElementById('5star') ?? 0;
  const bar4 = document.getElementById('4star') ?? 0;
  const bar3 = document.getElementById('3star') ?? 0;
  const bar2 = document.getElementById('2star') ?? 0;
  const bar1 = document.getElementById('1star') ?? 0;

  if (bar5 || bar4 || bar3 || bar2 || bar1) {
    bar5.style.width = `${(Number(meta.ratings[5] ?? 0) / numOfReviews) * 100}%`;
    bar4.style.width = `${(Number(meta.ratings[4] ?? 0) / numOfReviews) * 100}%`;
    bar3.style.width = `${(Number(meta.ratings[3] ?? 0) / numOfReviews) * 100}%`;
    bar2.style.width = `${(Number(meta.ratings[2] ?? 0) / numOfReviews) * 100}%`;
    bar1.style.width = `${(Number(meta.ratings[1] ?? 0) / numOfReviews) * 100}%`;
  }

  useEffect(() => {
    let newDisplayedReviews;
    if (barFilters.length === 0) {
      newDisplayedReviews = reviewListCopy;
    } else {
      newDisplayedReviews = reviewList.filter((review) => barFilters.includes(review.rating));
    }
    setDisplayedReviews(newDisplayedReviews);
  }, [reviews, barFilters]);

  const handleReviewFilter = (stars) => {
    let newStars = [];
    if (barFilters.includes(stars)) {
      newStars = barFilters.filter((star) => star !== stars);
    } else {
      newStars = [...barFilters, stars];
    }
    setBarFilters(newStars);
  };

  return (
    <>
      <div style={{ width: '300px' }}>
        <table>
          <tbody className="stars-container">
            {[5, 4, 3, 2, 1].map((stars) => (
              <tr key={stars} className="stars-bar-container" onClick={() => handleReviewFilter(stars)}>
                <td className="stars-text">
                  {stars}
                  {' '}
                  Stars
                </td>
                <td className="container-bar">
                  <div className="filled-bar" id={`${stars}star`} />
                  <div className="empty-bar" />
                </td>
                <td className="reviews-text">{meta !== undefined ? `${Number(meta.ratings[stars] ?? 0)} Reviews` : 'No reviews'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {barFilters.length > 0 && (
      <>
        <div className="applied-filters" style={{ display: 'inline' }}>Applied filters: </div>
        <div style={{ display: 'inline' }}>
          {barFilters.map((star, index) => (
            <span key={star} className="applied-filters">
              {index > 0 && ', '}
              {star}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setBarFilters([]);
            setDisplayedReviews(reviewListCopy);
          }}
          className="applied-filters-button"
          style={{ display: 'inline' }}
        >
          Clear filters
        </button>
      </>
      )}
    </>
  );
}

export default RatingBreakdownBars;
