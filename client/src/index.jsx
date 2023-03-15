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

  const pageLoad = () => {
    $.ajax({
      url: 'http://localhost:3001/products',
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
    // console.log('pageload use effect')
    pageLoad();
  }, [])

  useEffect(() => {
    // console.log('productAfterUseEffect', product)
  }, [product])

  if (product.length) {
    return (
      <div>
        <h1>Equinox Apparel</h1>
        <ProductOverview product={product} />
        <RelatedProducts />
        <ReviewList />
        <ProductBreakdown />
      </div >

    )
  } else {
    return (
      <div>Loading..</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))