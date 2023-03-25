/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Product from './Products';
import Outfits from './Outfits';
import Modal from './Modal';

function RelatedProducts({
  relatedData, product, update, compare, updateProduct, outfit, setoutfit,
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div id="related_products_container">
      {showModal ? <Modal setShowModal={setShowModal} compares={[product[0], compare]} /> : null}
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
