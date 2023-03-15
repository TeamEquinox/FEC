import React, { useState, useEffect } from 'react';
import StarRating from '../../starRatings'

const RatingBreakdown = ({ breakdown }) => {

  // default values
  let comfort = 50;
  let length = 50;
  let quality = 50;
  let fit = 50;
  let rating = 50;
  let numOfReviews = 0;
  let recommendCount = 0;
  let notRecommendCount = 0;
  let numOfStars = 4.5;

  // assign values from product
  if (breakdown !== undefined) {
    comfort = breakdown.characteristics.Comfort.value / 5 * 100;
    length = breakdown.characteristics.Length.value / 5 * 100;
    quality = breakdown.characteristics.Quality.value / 5 * 100;
    fit = breakdown.characteristics.Fit.value / 5 * 100;
    rating = (Number(breakdown.ratings[1]) + Number(breakdown.ratings[2]) + Number(breakdown.ratings[3]) + Number(breakdown.ratings[4]) + Number(breakdown.ratings[5])) / 5;
    numOfReviews = Number(breakdown.ratings[1]) + Number(breakdown.ratings[2]) + Number(breakdown.ratings[3]) + Number(breakdown.ratings[4]) + Number(breakdown.ratings[5]);
    recommendCount = Number(breakdown.recommended['true'])
    notRecommendCount = Number(breakdown.recommended['false'])
    numOfStars = rating / 100 * 5;
    const bar5 = document.getElementById("5star");
    bar5.style.width = `${Number(breakdown.ratings[5]) / numOfReviews * 100}%`;
    const bar4 = document.getElementById("4star");
    bar4.style.width = `${Number(breakdown.ratings[4]) / numOfReviews * 100}%`;
    const bar3 = document.getElementById("3star");
    bar3.style.width = `${Number(breakdown.ratings[3]) / numOfReviews * 100}%`;
    const bar2 = document.getElementById("2star");
    bar2.style.width = `${Number(breakdown.ratings[2]) / numOfReviews * 100}%`;
    const bar1 = document.getElementById("1star");
    bar1.style.width = `${Number(breakdown.ratings[1]) / numOfReviews * 100}%`;
  }

  const HorizontalLine = () => {
    const lineStyle = {
      height: '10px',
      backgroundColor: '#b1b1b1',
      border: 'none',
      borderRadius: '5px',
      marginRight: '2px'
    };
    return (
      <hr style={lineStyle} />
    )
  }

  // rating marker
  const VerticalLine = () => {
    const lineStyle = {
      height: '10px',
      width: '5px',
      backgroundColor: '#000000',
      border: 'none',
      borderRadius: '5px',
      marginRight: '2px'
    };
    return (
      <hr style={lineStyle} />
    )
  }

  return (
    <>
      <div style={{ width: '300px' }}>
        <h3>Overall Rating: {numOfStars.toFixed(1)}</h3>
        <h5>{numOfReviews} Reviews with {recommendCount} Recommendations!</h5>
        <StarRating rating={numOfStars} pixels={15} style={{ marginTop: '-20px' }} />

        <table>
          <tbody className="stars-container">
            {[5, 4, 3, 2, 1].map((stars) => (
              <tr key={stars} className="stars-bar-container">
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



        <h4>Size</h4>
        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start', marginTop: '-25px', position: 'relative' }}>
          <div style={{ width: '33.33%', zIndex: 1 }}>
            <div style={{ position: 'relative' }}>
              <HorizontalLine />
              <div style={{ fontSize: '12px', textAlign: 'left', marginTop: '-3px', marginLeft: '3px' }}>Small</div>
            </div>
          </div>
          <div style={{ width: '33.33%', zIndex: 1 }}>
            <div style={{ position: 'relative' }}>
              <HorizontalLine />
              <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '-5px' }}>Perfect</div>
            </div>
          </div>
          <div style={{ width: '33.33%', zIndex: 1 }}>
            <div style={{ position: 'relative' }}>
              <HorizontalLine />
              <div style={{ fontSize: '12px', textAlign: 'right', marginTop: '-5px', marginRight: '5px' }}>Large</div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: `${fit}%`, marginLeft: '-1px', zIndex: 2 }}>
            <VerticalLine />
          </div>
        </div>

        <h4>Comfort</h4>
        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start', marginTop: '-25px', position: 'relative' }}>
          <div style={{ width: '100%', position: 'relative' }}>
            <HorizontalLine />
            <div style={{ fontSize: '12px', textAlign: 'left', marginTop: '-5px', marginLeft: '5px' }}>Poor</div>
            <div style={{ fontSize: '12px', textAlign: 'right', marginTop: '-14px', marginRight: '5px' }}>Perfect</div>
          </div>
          <div style={{ position: 'absolute', left: `${comfort}%`, top: '0', bottom: '0', marginLeft: '-1px', zIndex: 2 }}>
            <VerticalLine />
          </div>
        </div>
      </div>
    </>
  );
}

export default RatingBreakdown;