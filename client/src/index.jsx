import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from 'react';
import ProductOverview from './product/ProductOverview.jsx';
import RatingsAndReviews from './reviews/index.jsx';
import RelatedProducts from './related/RelatedProducts.jsx';
import $ from 'jquery';
import axios from 'axios';
import QuestionsList from './questions/QuestionsList.jsx';


const App = () => {

  const [product, setProduct] = useState([])
  const [relatedData, setRelatedData] = useState([]);
  const [dataToCompare, setDataToCompare] =  useState ({});
  const [outfit, setOutfit] = useState([]);


  const pageLoad = () => {
    $.ajax({
      url: 'http://localhost:3001/products',
      method: "GET",
      success: (data) => {
        // console.log('success from get', data)
        setProduct(data);
        getRelatedProducts(data[1]['product_id']);
      },
      error: (err) => {
        console.log('error getting data', err)
      }
    })
  }

  const getRelatedProducts = (id) => {
    axios.get('/relatedProducts', { params: { data: id } })
      .then((data) => {
        setRelatedData(data.data);
      })
      .catch((err) => console.log('There was an error in the getRelatedProducts get request: ', err))
  }

  const getAndCompareCurrentProduct = (id) => {
    axios.get('/compare', { params: { data: id } })
      .then((data) => {
        setDataToCompare(data.data);
      })
      .catch((err) => console.log('There was an error in the getCurrentProduct get request: ', err))
  }

  const updateCurrentProduct = (id) => {
    axios.get('/setCurrentProduct', { params: { data: id } })
      .then((data) => {
        setProduct(data.data);
        getRelatedProducts(id);
      })
      .catch((err) => console.log('There was an error in the updateCurrentProduct get request: ', err))
  }
  const getFromCart = () => {
    $.ajax({
      url: '/cart',
      method: "GET",
      success: (data) => {
        // console.log('success from get', data)
        console.log('successful GET', data)
      },
      error: (err) => {
        console.log('error GETTING data', err)
      }
    })
  }

  const addToCart = () => {
    $.ajax({
      url: '/cart',
      method: "POST",
      data: {
      "sku_id" : 2580528,
        "count" : 2
      },
      success: (data) => {
        // console.log('success from get', data)
        getFromCart();
        console.log('successful POST')
      },
      error: (err) => {
        console.log('error POSTING data', err)
      }
    })
  }


  useEffect(() => {
    // console.log('pageload use effect')
    addToCart();
    pageLoad();
  }, [])



  if (product.length) {
    return (
      <div>
        <div className="div__banner"><h1><b>Equinox Apparel</b></h1> </div>
        <section className="section__announcement"><i>SITE-WIDE ANNOUCEMENT!</i> SALE/DISCOUNT <b>OFFER</b> - <u>NEW PRODUCT HIGHLIGHT</u></section>
        <ProductOverview product={product} />
        <RelatedProducts product={product} setRelatedData={setRelatedData} relatedData={relatedData} update={getAndCompareCurrentProduct} compare={dataToCompare} updateProduct={updateCurrentProduct}/>
        <RatingsAndReviews product={product} />
        <QuestionsList product_id={product[0]['id']}/>
      </div >
    )
  } else {
    return (
      <div>Loading..</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));