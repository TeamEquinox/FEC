import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Products.jsx';
import Outfits from './Outfits.jsx';
import Modal from './Modal.jsx';

const RelatedProducts = ({ relatedData, product }) => {
  const [showModal, setShowModal] = useState(false);
  const [compareRelated, setCompareRelated] = useState({});
  console.log('product---->', product);
  console.log('compareRelated---->', compareRelated)

  //returning components to index.jsx=======
  return (
    <div id="related_outfits_container">
      <Product relatedData={relatedData} setShowModal={setShowModal} setCompareRelated={setCompareRelated} /> 
      <Outfits/>
      {showModal ? <Modal setShowModal={setShowModal}/> : null}
    </div>
  )
}

export default RelatedProducts;