import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Products.jsx';
import Outfits from './Outfits.jsx';

const RelatedProducts = ({ product }) => {
  
  //managing state==========================
  const [relatedData, setRelatedData] = useState([]);
  
  //API requests============================
  if (!product[1]) {
    console.log('Hi, Im loading')
  } else {
    var productId = product[1]['product_id'];
    // var getRelatedProducts = (id) => {
      axios.get('relatedProducts', {params: {data: productId}})
        .then((data) => {
          console.log('recieved data in the client getRelatedProducts get request', data.data)
          setRelatedData(data.data)
        })
        .catch((err) => console.log('There was an error in the getRelatedProducts get request: ', err))
    // }
    // getRelatedProducts(productId);
  }

  //returning components to index.jsx=======
  return (
    <div>
     <Product data={relatedData}/>
     <Outfits/>
    </div>
  )
}

export default RelatedProducts;