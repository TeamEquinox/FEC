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
    console.log(breakdown)
  }

  const HorizontalLine = () => {
    const lineStyle = {
      height: '10px',
      backgroundColor: '#929292',
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
        <div class="container">
          <div class="filled-bar"></div>
          <div class="empty-bar"></div>
        </div>
        <br></br>
        <div class="container">
          <div class="filled-bar"></div>
          <div class="empty-bar"></div>
        </div>
        <br></br>
        <div class="container">
          <div class="filled-bar"></div>
          <div class="empty-bar"></div>
        </div>
        <br></br>
        <div class="container">
          <div class="filled-bar"></div>
          <div class="empty-bar"></div>
        </div>
        <br></br>
        <div class="container">
          <div class="filled-bar"></div>
          <div class="empty-bar"></div>
        </div>
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
          <div style={{ position: 'absolute', left: `${fit}%`, top: '0', bottom: '0', marginLeft: '-1px', zIndex: 2 }}>
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