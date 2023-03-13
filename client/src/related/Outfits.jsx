import React from 'react';
import {RxCrossCircled} from 'react-icons/Rx';


const Outfits = () => {
  return (
    <div className="div_outfit_container">
      <div>
        <div><RxCrossCircled/></div>
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

export default Outfits;