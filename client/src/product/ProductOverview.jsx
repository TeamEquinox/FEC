import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';
import Style from './Style';
import Image from './Image';
// import $ from 'jquery'

const ProductOverview = ({ product }) => {
  // const [product, setProduct] = useState([])

  // const pageLoad = () => {
  //   $.ajax({
  //     url: 'http://localhost:3001/products',
  //     method: "GET",
  //     success: (data) => {
  //       console.log('success from get', data)
  //       setProduct(data)
  //     },
  //     error: (err) => {
  //       console.log('error getting data', err)
  //     }
  //   })
  // }

  // useEffect(() => {
  //   pageLoad();
  // }, [])

  // useEffect(() => {
  //   console.log('productAfterUseEffect', product)
  // }, [product])

  return (
    <section className="section__product">
      <div className="div__product">
        <div>Star Ratings</div>
        <h3>{product.length ? product[0].category : "Category"}</h3>
        <h2>{product.length ? product[0].name : "Name"}</h2>
        <div>{product.length ? product[0].default_price : "Default Price"}</div>
        <p>Style > Selected Style</p>
        <Style styles={product.length ? product[1].results : null} />
      </div>
      <div className="image"><Image photos={product.length ? product[1].results : null} /></div>
      <div className="description">{product.length ? product[0].description : "Description"}</div>
    </section>



  )
}

export default ProductOverview;