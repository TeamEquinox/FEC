/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

/*
*   Pass in a ranting, pixel size, number of pixels shifted down, and number
*   of pixels shifted right to create the stars
*   Default for topMargin is -15px if nothing is passed in
*     <StarRating rating={3.8} pixels={15} space={-5}/>
*/
export function StarRating({
  rating, pixels, topMargin = -15, leftMargin = 0,
}) {
  const wholeStars = Math.floor(rating);
  const percentFill = 100 - ((rating - wholeStars) * 100);
  let clipPathValue = 0;
  const stars = [];

  if (percentFill < 13) {
    clipPathValue = 0;
  } else if (percentFill >= 13 && percentFill < 38) {
    clipPathValue = 35;
  } else if (percentFill >= 38 && percentFill < 63) {
    clipPathValue = 45;
  } else if (percentFill >= 63 && percentFill < 88) {
    clipPathValue = 60;
  } else {
    clipPathValue = 100;
  }

  for (let i = 0; i < wholeStars; i++) {
    stars.push(<FontAwesomeIcon
      key={i}
      icon={solidStar}
      style={{
        position: 'absolute',
        left: i * 20 + leftMargin,
        top: topMargin,
        color: '#757575',
      }}
    />);
  }

  for (let i = wholeStars; i < 5; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={i < rating ? solidStar : regularStar}
        style={{
          position: 'absolute',
          left: i * 20 + leftMargin,
          top: topMargin,
          clipPath: `inset(0 ${i < rating ? clipPathValue : 0}% 0 0)`,
          color: '#757575',
        }}
      />,
    );
    stars.push(
      <FontAwesomeIcon
        key={`regular-${i}`}
        icon={regularStar}
        style={{
          position: 'absolute',
          left: i * 20 + leftMargin,
          top: topMargin,
          color: '#757575',
        }}
      />,
    );
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block', fontSize: `${pixels}px` }}>
      {stars}
    </div>
  );
}

export default StarRating;
