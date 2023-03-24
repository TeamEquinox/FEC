import React, { useState, useEffect } from 'react';

// displays the rating bars and handlers clicks to send which bar/rating is clicked to set state
const RatingBreakdownBars = ({ meta, setFilteredReviews, reviews }) => {

  console.log(meta)
  let reviewList = reviews.results;

  const [filters, setFilters] = useState([]); // stars clicked so far for filtering
  const [displayedReviews, setDisplayedReviews] = useState([]);

  useEffect(() => {
    setFilteredReviews([...new Set(displayedReviews)])
  }, [displayedReviews])

  useEffect(() => {
    setFilteredReviews(reviewList);
  }, [reviewList]);

  let numOfReviews = Number(meta.ratings[1] ?? 0) + Number(meta.ratings[2] ?? 0) +
    Number(meta.ratings[3] ?? 0) + Number(meta.ratings[4] ?? 0) + Number(meta.ratings[5] ?? 0);

  const bar5 = document.getElementById("5star") ?? 0;
  const bar4 = document.getElementById("4star") ?? 0;
  const bar3 = document.getElementById("3star") ?? 0;
  const bar2 = document.getElementById("2star") ?? 0;
  const bar1 = document.getElementById("1star") ?? 0;

  if (bar5 || bar4 || bar3 || bar2 || bar1) {
    bar5.style.width = `${Number(meta.ratings[5] ?? 0) / numOfReviews * 100}%`;
    bar4.style.width = `${Number(meta.ratings[4] ?? 0) / numOfReviews * 100}%`;
    bar3.style.width = `${Number(meta.ratings[3] ?? 0) / numOfReviews * 100}%`;
    bar2.style.width = `${Number(meta.ratings[2] ?? 0) / numOfReviews * 100}%`;
    bar1.style.width = `${Number(meta.ratings[1] ?? 0) / numOfReviews * 100}%`;
  }

  const handleReviewFilter = (stars) => {
    const currentReviewCollection = reviews.results.filter((review) => review.rating === stars);
    let newDisplayedReviews;
    let newStars = [];
    if (filters.includes(stars)) {
      newDisplayedReviews = displayedReviews.filter(review => !currentReviewCollection.includes(review));
      newStars = filters.filter(star => star !== stars);
      setFilters(newStars);
    } else {
      newDisplayedReviews = [...currentReviewCollection, ...displayedReviews];
      setFilters([...filters, stars]);
    }

    if (newDisplayedReviews.length === 0) {
      setDisplayedReviews(reviewList);
    } else {
      setDisplayedReviews(newDisplayedReviews);
    }
  }

  return (
    <>
      <div style={{ width: '300px' }}>
        <table>
          <tbody className="stars-container">
            {[5, 4, 3, 2, 1].map((stars) => (
              <tr key={stars} className="stars-bar-container" onClick={() => handleReviewFilter(stars)}>
                <td className="stars-text">{stars} Stars</td>
                <td className="container-bar">
                  <div className="filled-bar" id={`${stars}star`}></div>
                  <div className="empty-bar"></div>
                </td>
                <td className="reviews-text">{meta !== undefined ? Number(meta.ratings[stars] ?? 0) + ' Reviews' : 'No reviews'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <>
          {filters.length > 0 && (
            <>
              <div className="applied-filters" style={{ display: "inline" }}>Applied filters: </div>
              <div style={{ display: "inline" }}>
                {filters.map((star, index) => (
                  <span key={star} className="applied-filters">
                    {index > 0 && ", "}
                    {star}
                  </span>
                ))}
              </div>
              <button onClick={() => setFilters([])} className="applied-filters-button" style={{ display: "inline" }}>Clear filters</button>
            </>
          )}
        </>
    </>
  )
}

export default RatingBreakdownBars