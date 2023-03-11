import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

import StarRating from '../../starRatings'

const IndividualReview = () => {


  return (
    <>
      <div>
        This is from the IndividualReview
      </div>
      <StarRating rating={3.8} pixels={15} />
    </>
  );
};


export default IndividualReview;
