import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Products.jsx';
import Outfits from './Outfits.jsx';
import Modal from './Modal.jsx';

function RelatedProducts({
  relatedData, product, update, compare, updateProduct, outfit, setoutfit,
}) {
  const [showModal, setShowModal] = useState(false);
  const combine = { ...compare[0], ...compare[1] };
  const combineProduct = { ...product[0], ...product[3] };

  return (
    <div id="related_products_container">
      {showModal ? <Modal setShowModal={setShowModal} compares={[combineProduct, combine]} />
        : null}
      <Product
        relatedData={relatedData}
        setShowModal={setShowModal}
        updates={update}
        updateProduct={updateProduct}
        product={product}
      />
      <Outfits data={outfit} product={product} setoutfit={setoutfit} />
    </div>
  );
}

export default RelatedProducts;
