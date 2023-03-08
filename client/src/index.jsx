import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from 'react';
import ProductOverview from './product/ProductOverview.jsx'
import ReviewList from './reviews/body/reviewList.jsx'
import ProductBreakdown from './reviews/summary/productBreakdown.jsx'
import QuestionsList from './questions/QuestionsList.jsx'

const App = () => {

  return (
    <div>
      <h1>Logo</h1>
      <ProductOverview />
      <ReviewList />
      <ProductBreakdown />
      <QuestionsList />
    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))