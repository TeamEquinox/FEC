import React, { useState, useEffect } from 'react';
import RatingBreakdownBars from './components/RatingBreakdownBars.jsx'
import SortFilters from './components/SortFilters.jsx'
import OverallReview from './components/OverallReview.jsx'
import ProductBreakdown from './components/ProductBreakdown.jsx'
import ReviewList from './components/ReviewList.jsx'
import SearchBar from './components/SearchBar.jsx'

const RatingsAndReviews = ({ product }) => {

  const [meta, setMeta] = useState(product[3]);
  const [reviews, setReviews] = useState(product[2]);
  const [filteredReviews, setFilteredReviews] = useState([]) // current filtered reviews if any

  useEffect(() => {
    setMeta(product[3])
    setReviews(product[2])
  }, [product])

  // console.log('meta, reviews', meta, reviews)
  return (
    <>
      <OverallReview meta={meta} />
      <RatingBreakdownBars meta={meta} setFilteredReviews={setFilteredReviews} reviews={reviews}/>
      <ProductBreakdown meta={meta} />
      <SortFilters reviews={reviews} />
      {/* <ReviewList reviews={filteredReviews} /> */}
      {/* <SearchBar /> */}
    </>
  )
}

export default RatingsAndReviews;