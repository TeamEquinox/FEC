import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';
import Style from './Style';
import Image from './Image';
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import StarRating from '../starRatings.jsx'


const ProductOverview = ({ product }) => {
  console.log('productOnLoad', product)
  const [gallery, setGallery] = useState([])
  const [largeImage, setLargeImage] = useState('')

  // useEffect(() => {
  //   console.log('new gallery')
  // }, [gallery])
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
      <div className="div__product">
        <div><StarRating rating={configRatings(product[3].ratings)} pixels={10} />  </div>
        <p><u>Read all reviews</u></p>
        <h3>{product.length ? product[0].category : "Category"}</h3>
        <h2>{product.length ? product[0].name : "Name"}</h2>
        <Style styles={product.length ? product[1].results : null} setGallery={setGallery} setLargeImage={setLargeImage} />
      </div>
      <Image photos={product.length ? product[1].results : null} setLargeImage={setLargeImage} gallery={gallery} largeImage={largeImage} />
      <div className="div__description">{product.length ? product[0].description : "Description"}</div>
      <div className="div__feature">{product.length ? product[0].features.map((feature) => {
        return (
          <ul>
            <li>{feature.feature}: {feature.value}</li>
          </ul>
        )
      })

        : null}</div>

    </section>



  )
}

export default ProductOverview;