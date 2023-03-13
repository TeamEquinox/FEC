import React, { useState, useEffect } from 'react';

import RatingBreakdown from './ratingBreakdown.jsx'
import SortOptions from './sortOptions.jsx'

const axios = require('axios');

const ProductBreakdown = ({ product }) => {

  // console.log('In ProductBreakdown: ', product[3])
  return (
    <>
      <div>This is from the ProductBreakdown</div>
      <RatingBreakdown breakdown={product[3]}/>
      <SortOptions />
    </>
  )
}

export default ProductBreakdown;