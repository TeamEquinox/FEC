import React, { useState, useEffect } from 'react';

import RatingBreakdown from './ratingBreakdown.jsx'
import SortOptions from './sortOptions.jsx'

const ProductBreakdown = () => {

  return (
    <>
      <RatingBreakdown />
      <SortOptions />
      <div>This is from the ProductBreakdown</div>
    </>
  )
}

export default ProductBreakdown;