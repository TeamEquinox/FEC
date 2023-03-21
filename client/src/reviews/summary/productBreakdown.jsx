import React, { useState, useEffect } from 'react';
import RatingBreakdown from './ratingBreakdown.jsx'

const axios = require('axios');

const ProductBreakdown = ({ product }) => {

  const [meta, setMeta] = useState(product[3]);
  const [reviews, setReviews] = useState(product[2]);

  useEffect(() => {
    setMeta(product[3])
    setReviews(product[2])
  }, [product])

  return (
    <>
      <div>This is from the ProductBreakdown</div>
      <RatingBreakdown meta={meta} reviews={reviews} />
      <SortOptions />
    </>
  )
}

export default ProductBreakdown;