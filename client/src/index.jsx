import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';
import Parent from './related/Parent.jsx';

import ReviewList from './reviews/body/reviewList.jsx'
import ProductBreakdown from './reviews/summary/productBreakdown.jsx'

const App = () => {
  return (
    <div>
      <ReviewList />
      <ProductBreakdown />
      <Parent/>
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('root'));