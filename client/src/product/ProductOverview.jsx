import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';
import Style from './Style';
import Image from './Image';
import $ from 'jquery'

const ProductOverview = () => {

  const pageLoad = () => {
    $.ajax({
      url: 'http://localhost:3001/products',
      method: "GET",
      success: (data) => {
        console.log('success from get', data)
      },
      error: (err) => {
        console.log('error getting data', err)
      }
    })
  }

  useEffect(() => {
    pageLoad();
  }, [])

  return (
    <section className="section__product">
      <div className="div__product">
        <div>Star Ratings</div>
        <h3>Category</h3>
        <h2>Product Title</h2>
        <div>Price</div>
        <p>Style > Selected Style</p>
        <Style />
      </div>
      <div className="image"><Image /></div>
      <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </section>



  )
}

export default ProductOverview;