import React, { useState, useEffect } from 'react';

import RatingBreakdown from './ratingBreakdown.jsx'
import SortOptions from './sortOptions.jsx'

const axios = require('axios');

const ProductBreakdown = ({ product }) => {

  const [breakdown, setBreakdown] = useState(product[3]);
  const [reviews, setReviews] = useState(product[2]);


  // console.log('In ProductBreakdown: ', product[2].results[2].rating)
  return (
    <>
      <div>This is from the ProductBreakdown</div>
      <RatingBreakdown breakdown={breakdown} reviews={reviews}/>
      <SortOptions />
    </>
  )
}

export default ProductBreakdown;