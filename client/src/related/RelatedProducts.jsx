import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Products.jsx';
import Outfits from './Outfits.jsx';
import Modal from './Modal.jsx';

const RelatedProducts = ({ relatedData, product, update, compare, updateProduct, outfit, setoutfit }) => {
  const [showModal, setShowModal] = useState(false);
  // console.log('PRODUCT---------->', product);
  
  return (
    <div id="related_products_container">
      {showModal ? <Modal setShowModal={setShowModal} compares={[product[0], compare]}/> : null}
      <Product relatedData={relatedData} setShowModal={setShowModal} updates={update} updateProduct={updateProduct}/> 
      <Outfits data={outfit} product={product} setoutfit={setoutfit}/>
    </div>
  )
}

export default RelatedProducts;