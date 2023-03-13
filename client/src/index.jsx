import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from 'react';
import ProductOverview from './product/ProductOverview.jsx'
import ReviewList from './reviews/body/reviewList.jsx'
import ProductBreakdown from './reviews/summary/productBreakdown.jsx'
import $ from 'jquery'
import RelatedProducts from './related/RelatedProducts.jsx'

const App = () => {

  const [product, setProduct] = useState([])
  const [relatedData, setRelatedData] = useState([]);

  const pageLoad = () => {
    $.ajax({
      url: 'http://localhost:3000/products',
      method: "GET",
      success: (data) => {
        console.log('success from get', data)
        setProduct(data)
      },
      error: (err) => {
        console.log('error getting data', err)
      }
    })
  }

  useEffect(() => {
    pageLoad();
  }, [])


  useEffect(() => {
    console.log('productAfterUseEffect', product)
  }, [product])

  return (
    <div>
      <h1>Logo</h1>
      <ProductOverview product={product} />
      <RelatedProducts product={product} setRelatedData={setRelatedData} relatedData={relatedData}/>
      <ReviewList />
      <ProductBreakdown />
    </div >
  )
}

ReactDOM.render(<App />, document.getElementById('root'))