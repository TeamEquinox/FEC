import React, { useState, useEffect } from 'react';
import StarRating from '../../starRatings'

const RatingBreakdown = ({ breakdown }) => {

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

  const clickHandler = (stars) => {
    console.log('clicked!', stars)
  }

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
        {comfort && (
          <>
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
          </>
        )}

        {length && (
          <>
            <h4>Length</h4>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start', marginTop: '-25px', position: 'relative' }}>
              <div style={{ width: '33.33%', zIndex: 1 }}>
                <div style={{ position: 'relative' }}>
                  <HorizontalLine />
                  <div style={{ fontSize: '12px', textAlign: 'left', marginTop: '-3px', marginLeft: '3px' }}>Poor</div>
                </div>
              </div>
              <div style={{ width: '33.33%', zIndex: 1 }}>
                <div style={{ position: 'relative' }}>
                  <HorizontalLine />
                  <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '-5px' }}>Good</div>
                </div>
              </div>
              <div style={{ width: '33.33%', zIndex: 1 }}>
                <div style={{ position: 'relative' }}>
                  <HorizontalLine />
                  <div style={{ fontSize: '12px', textAlign: 'right', marginTop: '-5px', marginRight: '5px' }}>Excellent</div>
                </div>
              </div>
              <div style={{ position: 'absolute', left: `${length}%`, marginLeft: '-1px', zIndex: 2 }}>
                <VerticalLine />
              </div>
            </div>
          </>
        )}

        {width && (
          <>
            <h4>Width</h4>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start', marginTop: '-25px', position: 'relative' }}>
              <div style={{ width: '33.33%', zIndex: 1 }}>
                <div style={{ position: 'relative' }}>
                  <HorizontalLine />
                  <div style={{ fontSize: '12px', textAlign: 'left', marginTop: '-3px', marginLeft: '3px' }}>Poor</div>
                </div>
              </div>
              <div style={{ width: '33.33%', zIndex: 1 }}>
                <div style={{ position: 'relative' }}>
                  <HorizontalLine />
                  <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '-5px' }}>Good</div>
                </div>
              </div>
              <div style={{ width: '33.33%', zIndex: 1 }}>
                <div style={{ position: 'relative' }}>
                  <HorizontalLine />
                  <div style={{ fontSize: '12px', textAlign: 'right', marginTop: '-5px', marginRight: '5px' }}>Excellent</div>
                </div>
              </div>
              <div style={{ position: 'absolute', left: `${width}%`, marginLeft: '-1px', zIndex: 2 }}>
                <VerticalLine />
              </div>
            </div>
          </>
        )}

        {quality && (
          <>
            <h4>Quality</h4>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start', marginTop: '-25px', position: 'relative' }}>
              <div style={{ width: '33.33%', zIndex: 1 }}>
                <div style={{ position: 'relative' }}>
                  <HorizontalLine />
                  <div style={{ fontSize: '12px', textAlign: 'left', marginTop: '-3px', marginLeft: '3px' }}>Poor</div>
                </div>
              </div>
              <div style={{ width: '33.33%', zIndex: 1 }}>
                <div style={{ position: 'relative' }}>
                  <HorizontalLine />
                  <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '-5px' }}>Good</div>
                </div>
              </div>
              <div style={{ width: '33.33%', zIndex: 1 }}>
                <div style={{ position: 'relative' }}>
                  <HorizontalLine />
                  <div style={{ fontSize: '12px', textAlign: 'right', marginTop: '-5px', marginRight: '5px' }}>Excellent</div>
                </div>
              </div>
              <div style={{ position: 'absolute', left: `${quality}%`, marginLeft: '-1px', zIndex: 2 }}>
                <VerticalLine />
              </div>
            </div>
          </>
        )}

        {size && (
          <>
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
              <div style={{ position: 'absolute', left: `${size}%`, marginLeft: '-1px', zIndex: 2 }}>
                <VerticalLine />
              </div>
            </div>
          </>
        )}

        {fit && (
          <>
            <h4>Fit</h4>
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
          </>
        )}
      </div>
    </>
  );
}

export default RatingBreakdown;