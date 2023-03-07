import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';
import ProductOverview from './product/ProductOverview.jsx'

const App = () => {
  return (
    <div>
      <h1>Logo</h1>
      <ProductOverview />
    </div>

  )
}

ReactDom.render(<App />, document.getElementById('root'));