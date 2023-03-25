import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';
import Style from './Style';
import Image from './Image';
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import StarRating from '../starRatings.jsx'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Cart from './Cart.jsx'

const ProductOverview = ({ product }) => {
  console.table('productOnLoad', product)

  const [gallery, setGallery] = useState([])
  const [largeImage, setLargeImage] = useState(product[1].results[0].photos[0].url)
  const [reviews, setReviews] = useState(0)
  const [cart, setCart] = useState(false)

  // useEffect(() => {
  // }, [product])

  useEffect(() => {
    if (largeImage.length !== 0 && document.getElementById(`check-${largeImage}`) !== null) {
      document.getElementById(`check-${largeImage}`).classList.remove('check_circled')
      document.getElementById(`check-${largeImage}`).classList.add('check_circled2')
    }
  }, [gallery])

  let counter = 0;
  useEffect(() => {
    let numReviews = Object.values(product[3].ratings)
    numReviews.forEach((review) => {
      counter += Number(review);
    })
    setReviews(counter)
    setLargeImage(product[1].results[0].photos[0].url)

  }, [product])

  var configRatings = (obj) => {
    var oneStar = Number(obj['1']);
    var twoStar = Number(obj['2']);
    var threeStar = Number(obj['3']);
    var fourStar = Number(obj['4']);
    var fiveStar = Number(obj['5']);
    var actualRating = ((oneStar * 1) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4) + (fiveStar * 5));
    var totalPossibleRating = ((oneStar + twoStar + threeStar + fourStar + fiveStar) * 5);
    var result = Math.round((actualRating / totalPossibleRating * 5) * 10) / 10;
    return result;
  }

  return (
    <section className="section__product">
      <FontAwesomeIcon icon={faCartShopping} className="shoppingCart" onClick={() => { setCart(true) }} />
      {cart ? <Cart setCart={setCart} /> : null}
      <div className="div__product">
        <div><StarRating rating={configRatings(product[3].ratings)} pixels={10} />  </div>
        <p onClick={() => { window.location.replace("/#overall-rating") }}><u>Read all {reviews} reviews</u></p>
        <h3>{product.length ? product[0].category : "Category"}</h3>
        <h2>{product.length ? product[0].name : "Name"}</h2>
        <Style styles={product.length ? product[1].results : null} setGallery={setGallery} setLargeImage={setLargeImage} largeImage={largeImage} />
      </div>
      <Image photos={product.length ? product[1].results : null} setLargeImage={setLargeImage} gallery={gallery} largeImage={largeImage} />
      <div className="div__description">{product.length ? product[0].description : "Description"}</div>
      <div className="div__feature">{product.length ? product[0].features.map((feature) => {
        return (
          <ul key={Math.floor(Math.random() * (1000 - 0 + 1) + 0)}>
            <li key={Math.floor(Math.random() * (1000 - 0 + 1) + 0)}>{feature.feature}: {feature.value}</li>
          </ul>
        )
      })
        : null}</div>

    </section>



  )
}

export default ProductOverview;