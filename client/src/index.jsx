import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

import ReviewList from './reviews/body/reviewList.jsx'
import ProductBreakdown from './reviews/summary/productBreakdown.jsx'

const App = () => {

  return (
    <div>
      <ReviewList />
      <ProductBreakdown />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))