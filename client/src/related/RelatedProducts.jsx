import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Products.jsx';
import Outfits from './Outfits.jsx';

const RelatedProducts = () => {
  return (
    <div>
     <Product/>
     <Outfits/>
    </div>
  )
}

export default RelatedProducts;