import React from 'react';
import {RxStar} from 'react-icons/Rx';


const Products = ({ data }) => {
  console.log('inside Products Component', data);
  
  return (
    <div>
      <div>
        <span><RxStar/></span>
        <div>place image here</div>
      </div>
      <div>
        <p>Category</p>
        <h4>Product Name</h4>
        <div>Price</div>
        <div>Star Rating</div>
      </div>
    </div>
  )
}

export default Products;