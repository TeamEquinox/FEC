import React, { useState, useEffect } from 'react';

import RatingBreakdown from './ratingBreakdown.jsx'
import SortOptions from './sortOptions.jsx'

const ProductBreakdown = () => {

  return (
    <>
      <div>This is from the ProductBreakdown</div>
      <RatingBreakdown />
      <SortOptions />
    </>
  )
}

export default ProductBreakdown;