import React, {useState, useEffect} from 'react';
import { RxCrossCircled } from 'react-icons/Rx';
import axios from 'axios';

var Outfits = () => {

  return (
    <div>
      <div>
        <button><RxCrossCircled/></button>
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

export default Outfits;