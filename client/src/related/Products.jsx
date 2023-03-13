import React from 'react';
import {RxStar} from 'react-icons/Rx';


const Products = ({ relatedData }) => {
  console.log('inside Products Component', relatedData);
  
  return (
    <div className="div_realated_container">
      <div>
        <div><RxStar/></div>
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