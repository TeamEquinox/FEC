import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from 'react';
import ProductOverview from './product/ProductOverview.jsx';
import ReviewList from './reviews/body/reviewList.jsx';
import ProductBreakdown from './reviews/summary/productBreakdown.jsx';
import RelatedProducts from './related/RelatedProducts.jsx';
import $ from 'jquery';
import axios from 'axios';
import QuestionsList from './questions/QuestionsList.jsx';


const App = () => {

  const [product, setProduct] = useState([])
  const [relatedData, setRelatedData] = useState([]);

  const pageLoad = () => {
    $.ajax({
      url: 'http://localhost:3001/products',
      method: "GET",
      success: (data) => {
        console.log('success from get', data)
        setProduct(data);
        getRelatedProducts(data[1]['product_id']);
      },
      error: (err) => {
        console.log('error getting data', err)
      }
    })
  }

  const getRelatedProducts = (id) => {
    axios.get('relatedProducts', {params: {data: id}})
      .then((data) => {
        console.log('recieved data in the client getRelatedProducts get request', data)
        setRelatedData(data.data);
      })
      .catch((err) => console.log('There was an error in the getRelatedProducts get request: ', err))
  }


  useEffect(() => {
    pageLoad();
  }, [])

  useEffect(() => {
    console.log('productAfterUseEffect', product)
  }, [product])

  if (product.length === 0) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <div>
        <h1>Logo</h1>
        <ProductOverview product={product} />
        <RelatedProducts product={product} setRelatedData={setRelatedData} relatedData={relatedData}/>
        <ReviewList product={product}/>
        <ProductBreakdown product={product}/>
        <QuestionsList product_id={product[0]['id']}/>
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'))