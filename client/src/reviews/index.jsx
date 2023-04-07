/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import RatingBreakdownBars from './components/RatingBreakdownBars';
import SortFilters from './components/SortFilters';
import OverallReview from './components/OverallReview';
import ProductBreakdown from './components/ProductBreakdown';
import ReviewList from './components/ReviewList';
// import SearchBar from './components/SearchBar';
import { getReviewsRefresher } from './helpers/userRequests';

function RatingsAndReviews({ product }) {
  const [meta, setMeta] = useState(product[3]);
  const [reviews, setReviews] = useState(product[2]);
  const [sorted, setSorted] = useState([]); // current filtered reviews if any
  const [displayedReviews, setDisplayedReviews] = useState(reviews.results);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setMeta(product[3]);
    setReviews(product[2]);
  }, [product]);

  useEffect(() => {
    setSorted([...new Set(displayedReviews)]);
  }, [displayedReviews]);

  const reviewRefresher = () => {
    if (product[2]) {
      getReviewsRefresher(Number(product[2].product)).then((results) => {
        if (results) {
          setReviews(results);
        }
      });
    }
  };

  useEffect(() => {
    reviewRefresher();
  }, [toggle]);

  return (
    <div style={{ display: 'flex', width: 'auto' }}>
      <br />
      <div style={{ flexGrow: 1 }}>
        <OverallReview meta={meta} />
        <RatingBreakdownBars
          meta={meta}
          reviews={reviews}
          setDisplayedReviews={setDisplayedReviews}
        />
        <ProductBreakdown meta={meta} />
      </div>
      <div style={{ flexGrow: 1, width: '100%' }}>
        <SortFilters
          reviews={sorted}
          setSorted={setSorted}
          setReviews={setReviews}
        />
        {/* <SearchBar /> */}
        <ReviewList
          reviews={sorted}
          toggle={toggle}
          setToggle={setToggle}
          productId={product[2].product}
          prodCharacteristics={[product[3].characteristics]}
          prodName={product[0].name}
        />
      </div>
      <br />
    </div>
  );
}

export default RatingsAndReviews;
