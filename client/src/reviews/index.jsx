/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import RatingBreakdownBars from "./components/RatingBreakdownBars";
import SortFilters from "./components/SortFilters";
import OverallReview from "./components/OverallReview";
import ProductBreakdown from "./components/ProductBreakdown";
import ReviewList from "./components/ReviewList";
import SearchBar from "./components/SearchBar";

function RatingsAndReviews({ product }) {
  const [meta, setMeta] = useState(product[3]);
  const [reviews, setReviews] = useState(product[2]);
  const [sorted, setSorted] = useState([]); // current filtered reviews if any
  const [displayedReviews, setDisplayedReviews] = useState(reviews.results);

  useEffect(() => {
    setMeta(product[3]);
    setReviews(product[2]);
  }, [product]);

  useEffect(() => {
    setSorted([...new Set(displayedReviews)]);
  }, [displayedReviews]);

  return (
    <>
      <OverallReview meta={meta} />
      <RatingBreakdownBars
        meta={meta}
        reviews={reviews}
        setDisplayedReviews={setDisplayedReviews}
      />
      <ProductBreakdown meta={meta} />
      <SortFilters
        reviews={sorted}
        setSorted={setSorted}
        setReviews={setReviews}
      />
      <ReviewList
        reviews={sorted}
        productId={product[2].product}
        prodCharacteristics={[product[3].characteristics]}
      />
      <SearchBar />
    </>
  );
}

export default RatingsAndReviews;
