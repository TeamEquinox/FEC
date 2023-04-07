/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Product from './Products';
import Outfits from './Outfits';
import Modal from './Modal';

function RelatedProducts({
  relatedData, product, update, compare, updateProduct, outfit, setOutfit, dark,
}) {
  const [showModal, setShowModal] = useState(false);
  const combine = { ...compare[0], ...compare[1] };
  const combineProduct = { ...product[0], ...product[3] };

  return (
    <div id="related_products_container">
      {showModal ? <Modal setShowModal={setShowModal} compares={[combineProduct, combine]} dark={dark} />
        : null}
      <Product
        relatedData={relatedData}
        setShowModal={setShowModal}
        updates={update}
        updateProduct={updateProduct}
        product={product}
        dark={dark}
      />
      <Outfits outfit={outfit} product={product} setOutfit={setOutfit} dark={dark} />
    </div>
  );
}

export default RelatedProducts;
