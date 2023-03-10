import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Products.jsx';
import Outfits from './Outfits.jsx';

const RelatedProducts = ({ product }) => {
  console.log('inside RelatedProducts ', product);
  
  //managing state==========================
  const [relatedData, setRelatedData] = useState([]);

  //API requests============================
  var getRelatedProducts = () => {
    axios.get('relatedProducts', {params: {data: id}})
      .then((data) => {
        console.log('recieved data in the client getRelatedProducts get request', data)
      })
      .catch((err) => console.log('There was an error in the getRelatedProducts get request: ', err))
  }

  //returning components to index.jsx=======
  return (
    <div>
     <Product relatedData={relatedData}/>
     <Outfits/>
    </div>
  )
}

export default RelatedProducts;