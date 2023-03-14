import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Products.jsx';
import Outfits from './Outfits.jsx';
import Modal from './Modal.jsx';

const RelatedProducts = ({ relatedData }) => {
  const [showModal, setShowModal] = useState(false);
  // console.log('product---->', product)
  //managing state==========================
  // const [relatedData, setRelatedData] = useState([]);
  
  // //API requests============================
  // if (!relatedData) {
  //   console.log('Hi, Im loading')
  // } else {
  //   console.log('inside RelatedProducts ', relatedData);
    // console.log('inside RelatedProducts ', product[1]['product_id']);
    // var productId = product[1]['product_id'];
    // var getRelatedProducts = (id) => {
    //   axios.get('relatedProducts', {params: {data: id}})
    //     .then((data) => {
    //       console.log('recieved data in the client getRelatedProducts get request', data)
    //       // setRelatedData(data.data);
    //     })
    //     .catch((err) => console.log('There was an error in the getRelatedProducts get request: ', err))
    // }
    // getRelatedProducts(productId);
  // }

  //returning components to index.jsx=======
  return (
    <div id="related_outfits_container">
      <Product relatedData={relatedData} setShowModal={setShowModal} /> 
      <Outfits/>
      {showModal ? <Modal setShowModal={setShowModal}/> : null}
    </div>
  )
}

export default RelatedProducts;