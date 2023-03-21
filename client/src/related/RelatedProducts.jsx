import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Products.jsx';
import Outfits from './Outfits.jsx';
import Modal from './Modal.jsx';


const RelatedProducts = ({ relatedData, product, update, compare, updateProduct}) => {
  const [showModal, setShowModal] = useState(false);
  // const [compares, setCompare] = useState([]);
  // setCompare([product[0], compare]);


  
  //returning components to index.jsx=======
  return (
    <div id="related_outfits_container">
      {showModal ? <Modal setShowModal={setShowModal} compares={[product[0], compare]}/> : null}
      <Product relatedData={relatedData} setShowModal={setShowModal} updates={update} updateProduct={updateProduct}/> 
      <Outfits/>
    </div>
  )
}

export default RelatedProducts;