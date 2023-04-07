/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import ProductOverview from './product/ProductOverview';
import RatingsAndReviews from './reviews/index';
import RelatedProducts from './related/RelatedProducts';
import QuestionsList from './questions/QuestionsList';
import useClickTracking from './useClickTracking';
import clientHelpers from './clientSideHelpers';

function App() {
  const [product, setProduct] = useState([]);
  const [relatedData, setRelatedData] = useState([]);
  const [dataToCompare, setDataToCompare] = useState([]);
  const [outfit, setOutfit] = useState([]);
  const [dark, setDark] = useState(false);

  const getRelatedProducts = (id) => {
    const isCached = clientHelpers.checkIfCached(id, 'getRelatedProducts');
    if (isCached) {
      setRelatedData(isCached);
    } else {
      axios
        .get('/relatedProducts', { params: { data: id } })
        .then((data) => {
          clientHelpers.addAPICallToCache(id, data.data, 'getRelatedProducts');
          setRelatedData(data.data);
        })
        .catch((err) => console.log('There was an error in the getRelatedProducts get request: ', err));
    }
  };

  const pageLoad = () => {
    const isCached = clientHelpers.checkIfCached('product', 'product');
    if (isCached) {
      setProduct(isCached);
      getRelatedProducts(isCached[1].product_id);
    } else {
      $.ajax({
        url: '/products',
        method: 'GET',
        success: (data) => {
          clientHelpers.addAPICallToCache('product', data, 'product');
          setProduct(data);
          getRelatedProducts(data[1].product_id);
        },
        error: (err) => {
          console.log('error getting data', err);
        },
      });
    }
  };

  useEffect(() => {
    pageLoad();
  }, []);

  const getAndCompareCurrentProduct = (id) => {
    const isCached = clientHelpers.checkIfCached(id, 'getAndCompareCurrentProduct');
    if (isCached) {
      setDataToCompare(isCached);
    } else {
      axios
        .get('/compare', { params: { data: id } })
        .then((data) => {
          clientHelpers.addAPICallToCache(id, data, 'getAndCompareCurrentProduct');
          setDataToCompare(data.data);
        })
        .catch((err) => console.log('There was an error in the getCurrentProduct get request: ', err));
    }
  };

  const updateCurrentProduct = (id) => {
    const isCached = clientHelpers.checkIfCached(id, 'updateCurrentProduct');
    if (isCached) {
      setProduct(isCached);
      getRelatedProducts(id);
    } else {
      axios
        .get('/setCurrentProduct', { params: { data: id } })
        .then((data) => {
          clientHelpers.addAPICallToCache(id, data.data, 'updateCurrentProduct');
          setProduct(data.data);
          getRelatedProducts(id);
        })
        .catch((err) => console.log('There was an error in the updateCurrentProduct get request: ', err));
    }
  };

  const darkMode = () => {
    const root = document.getElementById('root');
    const bar = document.getElementById('bottom_bar');
    const banner = document.getElementById('banner');
    root.className = 'body2';
    bar.className = 'div__bottom_bar2';
    banner.className = 'div__banner2';
    setDark(true);
  };

  const liteMode = () => {
    const root = document.getElementById('root');
    const bar = document.getElementById('bottom_bar');
    const banner = document.getElementById('banner');
    root.className = 'body';
    bar.className = 'div__bottom_bar';
    banner.className = 'div__banner';
    setDark(false);
  };

  // useEffect(() => {
  // console.log('productAfterUseEffect', product)
  // }, [product])
  useClickTracking();

  if (product.length) {
    return (
      <div>
        <div className="div__banner" id="banner" onClick={ () => { dark ? liteMode() : darkMode(); } }>
          <h1>
            <b>Equinox Apparel</b>
          </h1>
        </div>
        <section className="section__announcement">
          <i>SITE-WIDE ANNOUCEMENT!</i>
          {' '}
          SALE/DISCOUNT
          {' '}
          <b>OFFER</b>
          -
          <u>NEW PRODUCT HIGHLIGHT</u>
        </section>
        <ProductOverview product={product} setOutfit={setOutfit} />
        <RelatedProducts
          product={product}
          setRelatedData={setRelatedData}
          relatedData={relatedData}
          update={getAndCompareCurrentProduct}
          compare={dataToCompare}
          updateProduct={updateCurrentProduct}
          setoutfit={setOutfit}
          outfit={outfit}
        />
        <QuestionsList product_id={product[0].id} productName={product[0].name} />
        <br />
        <RatingsAndReviews product={product} />
      </div>
    );
  }
  return (
    <div>Loading..</div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
