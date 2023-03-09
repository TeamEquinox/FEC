import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const IndividualReview = () => {
  return (
    <>
      <div>
        This is from the IndividualReview
      </div>
      <div className="star" style={{ position: 'relative', fontSize: '25px' }}>
        <FontAwesomeIcon icon={regularStar} style={{ position: 'absolute', left: 0, top: 0, clipPath: 'inset(0 ' + (-60) + '% 0 0)', color: '#757575' }} />
        <FontAwesomeIcon icon={solidStar} style={{ position: 'absolute', left: 0, top: 0, clipPath: 'inset(0 ' + (100-40) + '% 0 0)', color: '#757575' }} />
        <br />
      </div>
    </>
  );
};

export default IndividualReview;
