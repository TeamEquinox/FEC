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
  const [sorted, setSorted] = useState([]) // current filtered reviews if any
  const [displayedReviews, setDisplayedReviews] = useState(reviews.results);

  useEffect(() => {
    setMeta(product[3])
    setReviews(product[2])
  }, [product])

  useEffect(() => {
    setSorted([...new Set(displayedReviews)])
  }, [displayedReviews])

  return (
    <>
      <OverallReview meta={meta} />
      <RatingBreakdownBars meta={meta} reviews={reviews} setSorted={setSorted} displayedReviews={displayedReviews} setDisplayedReviews={setDisplayedReviews}/>
      <ProductBreakdown meta={meta} />
      <SortFilters reviews={sorted} setSorted={setSorted} setReviews={setReviews}/>
      <ReviewList reviews={sorted} />
      {/* <SearchBar /> */}
    </>
  )
}

export default RatingsAndReviews;