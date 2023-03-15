import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';
import Style from './Style';
import Image from './Image';
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const ProductOverview = ({ product }) => {
  console.log('productOnLoad', product)
  const [gallery, setGallery] = useState([])
  const [largeImage, setLargeImage] = useState('')

  // useEffect(() => {
  //   console.log('new gallery')
  // }, [gallery])

  return (
    <section className="section__product">
      <div className="div__product">
        <div> <FontAwesomeIcon icon={regularStar} style={{ position: 'absolute', left: 0, top: -30, clipPath: 'inset(0 ' + (-60) + '% 0 0)', color: '#757575' }} /> <FontAwesomeIcon icon={regularStar} style={{ position: 'absolute', left: 25, top: -30, clipPath: 'inset(0 ' + (-60) + '% 0 0)', color: '#757575' }} />
        </div>
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