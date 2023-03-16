import React, { useState, useEffect } from 'react';
import StarRating from '../../starRatings'
import { SingleBarDisplay } from './barDisplay'
import { MultiBarDisplay } from './barDisplay'
import IndividualReview from './individualReview.jsx'


const RatingBreakdown = ({ breakdown, reviews }) => {

  let reviewList = reviews.results;
  // console.log('in RatingBreakdown reviewList: ', reviewList)

  // default values
  // let comfort = null;
  // let length = null;
  // let width = null;
  // let quality = null;
  // let size = null;
  // let fit = null;
  // let rating = null;
  // let numOfReviews = null;
  // let recommendCount = null;
  // let notRecommendCount = null;
  // let numOfStars = null;

  // assign values from product
  // if (breakdown !== undefined) {
  const [filteredReviews, setFilteredReviews] = useState([])
  const [displayedReviews, setDisplayedReviews] = useState([]);


  let comfort = breakdown.characteristics.Comfort ? (breakdown.characteristics.Comfort.value / 5 * 100) : null
  let length = breakdown.characteristics.Length ? (breakdown.characteristics.Length.value / 5 * 100) : null
  let width = breakdown.characteristics.Width ? (breakdown.characteristics.Width.value / 5 * 100) : null
  let quality = breakdown.characteristics.Quality ? (breakdown.characteristics.Quality.value / 5 * 100) : null
  let size = breakdown.characteristics.Size ? (breakdown.characteristics.Size.value / 5 * 100) : null
  let fit = breakdown.characteristics.Fit ? (breakdown.characteristics.Fit.value / 5 * 100) : null

  let rating = (Number(breakdown.ratings[1]) + Number(breakdown.ratings[2]) + Number(breakdown.ratings[3]) + Number(breakdown.ratings[4]) + Number(breakdown.ratings[5])) / 5;
  let numOfReviews = Number(breakdown.ratings[1]) + Number(breakdown.ratings[2]) + Number(breakdown.ratings[3]) + Number(breakdown.ratings[4]) + Number(breakdown.ratings[5]);
  let recommendCount = Number(breakdown.recommended['true'])
  let notRecommendCount = Number(breakdown.recommended['false'])
  let numOfStars = rating / 100 * 5;

  const bar5 = document.getElementById("5star");
  const bar4 = document.getElementById("4star");
  const bar3 = document.getElementById("3star");
  const bar2 = document.getElementById("2star");
  const bar1 = document.getElementById("1star");

  if (bar5 || bar4 || bar3 || bar2 || bar1) {
    bar5.style.width = `${Number(breakdown.ratings[5]) / numOfReviews * 100}%`;
    bar4.style.width = `${Number(breakdown.ratings[4]) / numOfReviews * 100}%`;
    bar3.style.width = `${Number(breakdown.ratings[3]) / numOfReviews * 100}%`;
    bar2.style.width = `${Number(breakdown.ratings[2]) / numOfReviews * 100}%`;
    bar1.style.width = `${Number(breakdown.ratings[1]) / numOfReviews * 100}%`;
  }
  // }

  const clickHandler = (stars) => {
    const currentReviewCollection = reviews.results.filter((review) => review.rating === stars);
    let newDisplayedReviews;
    if (displayedReviews.includes(...currentReviewCollection)) {
      newDisplayedReviews = displayedReviews.filter(review => !currentReviewCollection.includes(review));
    } else {
      newDisplayedReviews = [...currentReviewCollection, ...displayedReviews];
    }
    if (newDisplayedReviews.length === 0) {
      setDisplayedReviews(reviewList);
    } else {
      setDisplayedReviews(newDisplayedReviews);
    }
  }



  useEffect(() => {
    setFilteredReviews([...new Set(displayedReviews)])
  }, [displayedReviews])

  useEffect(() => {
    setFilteredReviews(reviewList);
  }, [reviewList]);

  return (
    <>
      <div style={{ width: '300px' }}>
        <h3>Overall Rating: {numOfStars.toFixed(1)}</h3>
        <h5>{numOfReviews} Reviews with {recommendCount} Recommendations!</h5>
        <h5>Which means {(recommendCount / numOfReviews * 100).toFixed(0)}% of buyers recommend this! </h5>

        <StarRating rating={numOfStars} pixels={15} style={{ marginTop: '-20px' }} />

        {/* displays the rating bars and handlers clicks to send which bar/rating is clicked to set state */}
        <table>
          <tbody className="stars-container">
            {[5, 4, 3, 2, 1].map((stars) => (
              <tr key={stars} className="stars-bar-container" onClick={() => clickHandler(stars)}>
                <td className="stars-text">{stars} Stars</td>
                <td className="container-bar">
                  <div className="filled-bar" id={`${stars}star`}></div>
                  <div className="empty-bar"></div>
                </td>
                <td className="reviews-text">{breakdown !== undefined ? Number(breakdown.ratings[stars]) + ' Reviews' : 'No reviews'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* displays the Size, Width, Comfort, Quality, Length, and Fit IF they exist */}
        <SingleBarDisplay element={comfort} headerText={"Comfort"} lowRating={"Physical Pain"} highRating={"Nirvana"} />
        <SingleBarDisplay element={length} headerText={"Length"} lowRating={"For Shorties"} highRating={"For Giants"} />
        <MultiBarDisplay element={width} headerText={"Width"} />
        <MultiBarDisplay element={quality} headerText={"Quality"} />
        <MultiBarDisplay element={size} headerText={"Size"} />
        <MultiBarDisplay element={fit} headerText={"Fit"} />

        <IndividualReview reviews={filteredReviews}/>

      </div>
    </>
  );
}

export default RatingBreakdown;