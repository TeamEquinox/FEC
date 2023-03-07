import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Products from './Products.jsx';
import Outfits from './Outfits.jsx';

var Related = () => {

  return (
    <div>
      <Products/>
      <Outfits/>
    </div>
  )
}

export default Related;