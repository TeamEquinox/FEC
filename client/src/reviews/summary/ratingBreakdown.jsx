import React, { useState, useEffect } from 'react';
import StarRating from '../../starRatings'
import { SingleBarDisplay } from './barDisplay'
import { MultiBarDisplay } from './barDisplay'
import IndividualReview from './individualReview.jsx'


const RatingBreakdown = ({ meta, reviews }) => {

  let reviewList = reviews.results;
  // console.log('in RatingBreakdown reviews, meta: ', reviews, meta)

  const [filteredReviews, setFilteredReviews] = useState([]) // current filtered reviews if any
  const [filters, setFilters] = useState([]); // stars clicked so far for filtering
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [sort, setSort] = useState('');

  let comfort = meta.characteristics.Comfort ? (meta.characteristics.Comfort.value / 5 * 100) : null
  let length = meta.characteristics.Length ? (meta.characteristics.Length.value / 5 * 100) : null
  let width = meta.characteristics.Width ? (meta.characteristics.Width.value / 5 * 100) : null
  let quality = meta.characteristics.Quality ? (meta.characteristics.Quality.value / 5 * 100) : null
  let size = meta.characteristics.Size ? (meta.characteristics.Size.value / 5 * 100) : null
  let fit = meta.characteristics.Fit ? (meta.characteristics.Fit.value / 5 * 100) : null

  let rating = (Number(meta.ratings[1]) * 1) + (Number(meta.ratings[2]) * 2) + (Number(meta.ratings[3]) * 3) +
    (Number(meta.ratings[4]) * 4) + (Number(meta.ratings[5]) * 5);
  let totalPossibleRating = (Number(meta.ratings[1]) + Number(meta.ratings[2]) + Number(meta.ratings[3]) +
    Number(meta.ratings[4]) + Number(meta.ratings[5])) * 5
  let numOfReviews = Number(meta.ratings[1]) + Number(meta.ratings[2]) + Number(meta.ratings[3]) + Number(meta.ratings[4]) + Number(meta.ratings[5]);
  let numOfStars = rating / totalPossibleRating * 5;
  let recommendCount = Number(meta.recommended['true'])
  let notRecommendCount = Number(meta.recommended['false'])

  const bar5 = document.getElementById("5star") ?? 0;
  const bar4 = document.getElementById("4star") ?? 0;
  const bar3 = document.getElementById("3star") ?? 0;
  const bar2 = document.getElementById("2star") ?? 0;
  const bar1 = document.getElementById("1star") ?? 0;

  if (bar5 || bar4 || bar3 || bar2 || bar1) {
    bar5.style.width = `${Number(meta.ratings[5]) / numOfReviews * 100}%`;
    bar4.style.width = `${Number(meta.ratings[4]) / numOfReviews * 100}%`;
    bar3.style.width = `${Number(meta.ratings[3]) / numOfReviews * 100}%`;
    bar2.style.width = `${Number(meta.ratings[2]) / numOfReviews * 100}%`;
    bar1.style.width = `${Number(meta.ratings[1]) / numOfReviews * 100}%`;
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

  const handleSortChange = (event) => {
    console.log(`User selected ${event.target.value}`)
    if (event.target.value === 'Helpfullness') {
      let filteredHelpfullness = reviews.results.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      })
    } else if (event.target.value === 'Newest') {
      let filteredNewest = reviews.results.sort((a, b) => {
        let da = new Date(a.date);
        let db = new Date(b.date);
        return db - da;
      })
    } else {
      let filteredRelevance = reviews.results.sort((a, b) => {
        let diffA = Date.now() - new Date(a.date).getTime();
        let diffB = Date.now() - new Date(b.date).getTime();
        let scoreA = a.helpfulness / Math.log10(diffA + 1);
        let scoreB = b.helpfulness / Math.log10(diffB + 1);
        return scoreB - scoreA;
      })
    }
    setSort(event.target.value)
  };

  useEffect(() => {
    setFilteredReviews([...new Set(displayedReviews)])
  }, [displayedReviews])

  useEffect(() => {
    setFilteredReviews(reviewList);
  }, [reviewList]);

  return (
    <>
      <div style={{ width: '300px' }}>
        <h3 id="overall-rating">Overall Rating: {numOfStars.toFixed(1)}</h3>
        <StarRating rating={numOfStars} pixels={20} />
        <h5>{(recommendCount / numOfReviews * 100).toFixed(0)}% of reviews recommend this product! </h5>

        {/* displays the rating bars and handlers clicks to send which bar/rating is clicked to set state */}
        <table>
          <tbody className="stars-container">
            {[5, 4, 3, 2, 1].map((stars) => (
              <tr key={stars} className="stars-bar-container" onClick={() => handleReviewFilter(stars)}>
                <td className="stars-text">{stars} Stars</td>
                <td className="container-bar">
                  <div className="filled-bar" id={`${stars}star`}></div>
                  <div className="empty-bar"></div>
                </td>
                <td className="reviews-text">{meta !== undefined ? Number(meta.ratings[stars]) + ' Reviews' : 'No reviews'}</td>
              </tr>
            ))}
          </tbody>
        </table>

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

        <h5>{numOfReviews} Reviews with {recommendCount} Recommendations!</h5>

        {/* displays the Size, Width, Comfort, Quality, Length, and Fit IF they exist */}
        <SingleBarDisplay element={comfort} headerText={"Comfort"} lowRating={"Physical Pain"} highRating={"Nirvana"} />
        <SingleBarDisplay element={length} headerText={"Length"} lowRating={"Shorties"} highRating={"Giants"} />
        <MultiBarDisplay element={width} headerText={"Width"} />
        <MultiBarDisplay element={quality} headerText={"Quality"} />
        <MultiBarDisplay element={size} headerText={"Size"} />
        <MultiBarDisplay element={fit} headerText={"Fit"} />
      </div>
      <br></br>
      <br></br>

      <label htmlFor="sort-order">Sort order:</label>
      <select id="sort-order" value={sort} onChange={handleSortChange}>
        <option value=""></option>
        <option value="Relevance">Relevance</option>
        <option value="Newest">Newest</option>
        <option value="Helpfullness">Helpful</option>
      </select>

      <IndividualReview reviews={filteredReviews} />
    </>
  );
}

export default RatingBreakdown;