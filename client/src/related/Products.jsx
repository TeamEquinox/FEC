import React, {useState, useEffect} from 'react';
import { RxStar } from 'react-icons/Rx';
import axios from 'axios';

var Products = () => {

  const handleStarClick = () => {

  }
  return (
    <div>
      <div>
        <button><RxStar/></button>
      </div>
      <div>
        <p>CATEGORY</p>
        <h4>Product name</h4>
        <div>Price$</div>
        <div>Star rating</div>
      </div>
    </div>
  )
}

export default Products;