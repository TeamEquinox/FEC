import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../starRatings.jsx';
import Image from './Image';
import Style from './Style';
import Cart from './Cart.jsx';

function ProductOverview({ product }) {
  console.table('productOnLoad', product);

  const [gallery, setGallery] = useState(product[1].results[0].photos);
  const [largeImage, setLargeImage] = useState(product[1].results[0].photos[0].url);
  const [reviews, setReviews] = useState(0);
  const [cart, setCart] = useState(false);

  useEffect(() => {
    setLargeImage(product[1].results[0].photos[0].url);
  }, [product]);

  useEffect(() => {
    if (largeImage.length !== 0 && document.getElementById(`check-${largeImage}`) !== null) {
      document.getElementById(`check-${largeImage}`).classList.remove('check_circled');
      document.getElementById(`check-${largeImage}`).classList.add('check_circled2');
    }
    // setGallery(product[1].results[0].photos)
  }, [largeImage]);

  let counter = 0;
  useEffect(() => {
    const numReviews = Object.values(product[3].ratings);
    numReviews.forEach((review) => {
      counter += Number(review);
    });
    setReviews(counter);
  }, [product]);

  const configRatings = (obj) => {
    const oneStar = Number(obj['1']);
    const twoStar = Number(obj['2']);
    const threeStar = Number(obj['3']);
    const fourStar = Number(obj['4']);
    const fiveStar = Number(obj['5']);
    const actualRating = ((oneStar * 1) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4) + (fiveStar * 5));
    const totalPossibleRating = ((oneStar + twoStar + threeStar + fourStar + fiveStar) * 5);
    const result = Math.round((actualRating / totalPossibleRating * 5) * 10) / 10;
    return result;
  };

  return (
    <section className="section__product">
      <FontAwesomeIcon icon={faCartShopping} className="shoppingCart" onClick={() => { setCart(true); }} />
      {cart ? <Cart setCart={setCart} /> : null}
      <div className="div__product">
        <div>
          <StarRating rating={configRatings(product[3].ratings)} pixels={10} />
          {' '}
        </div>
        <p onClick={() => { window.location.replace('/#overall-rating'); }}>
          <u>
            Read all {reviews}{' '}reviews
          </u>
        </p>
        <h3>{product.length ? product[0].category : 'Category'}</h3>
        <h2>{product.length ? product[0].name : 'Name'}</h2>
        <Style styles={product.length ? product[1].results : null} setGallery={setGallery} setLargeImage={setLargeImage} largeImage={largeImage} />
      </div>
      <Image photos={product.length ? product[1].results : null} setLargeImage={setLargeImage} gallery={gallery} largeImage={largeImage} setGallery={setGallery} />
      <div className="div__description">{product.length ? product[0].description : 'Description'}</div>
      <div className="div__feature">
        {product.length ? product[0].features.map((feature) => (
          <ul key={Math.floor(Math.random() * (1000 - 0 + 1) + 0)}>
            <li key={Math.floor(Math.random() * (1000 - 0 + 1) + 0)}>
              {feature.feature}
              :
              {' '}
              {feature.value}
            </li>
          </ul>
        ))
          : null}
      </div>
    </section>

  );
}

export default ProductOverview;
