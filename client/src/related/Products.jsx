import React from 'react';
import { RxStar, RxCaretLeft, RxCaretRight } from 'react-icons/Rx';
import StarRating from '../starRatings.jsx';
import helpers from '../clientSideHelpers.js';



const Products = ({ relatedData, setShowModal, updates, updateProduct, product }) => {

  const handleStarClick = (item) => {
    setShowModal(true);
    updates(item);
  }
  const handleRelatedCardClick = (id) => {
    updateProduct(id);
  }

  if (!relatedData) {
    return (
      <div>
        Loading.....!
      </div>
    )
  } else {
    return (
      <>
        <h3 className="h3_related_title">Related Products</h3>
        <div className="div_card_container">
          <RxCaretLeft onClick={() => helpers.slideLeft('slider')} className="div_left_caret" />
          <div id="slider" className="div_slider">
            <div>
              {
                relatedData.map((item) => {
                  var price = item.original_price;
                  var salesPrice = null;
                  if (item.sale_price !== 'N/A') {
                    salesPrice = item.sale_price;
                  }
                  console.log('PRODUCT----->', product[0].id);
                  console.log('ITEM----->', item.id);
                  if (item.photo !== 'N/A' && product[0].id !== item.id) {
                    return <div key={item.id} className="div_card" >
                      <div className="div_image_action_container">
                        <RxStar className="icon_action" onClick={() => {
                          handleStarClick(item.id)
                        }} />
                        <img className="img_card" src={item.photo} onClick={() => { handleRelatedCardClick(item.id) }}></img>
                      </div>
                      <div className="div_info_container" onClick={() => { handleRelatedCardClick(item.id) }}>
                        <div className="div_related_category related_card">Category: {item.category}</div>
                        <div className="div_related_name related_card">Name: {item.name}</div>
                        {salesPrice !== null ? <div className="div_related_price related_card"><span style={{ color: 'red' }}>${salesPrice}</span> <span style={helpers.style}>${price}</span>
                        </div> : <div className="div_related_price related_card"><span>${price}</span></div>}
                        <br></br>
                        <StarRating rating={helpers.configRatings(item.rating)} pixels={10} className="div_rating" />
                      </div>
                    </div>
                  }
                })
              }
            </div>
          </div>
          <RxCaretRight onClick={() => helpers.slideRight('slider')} className="div_right_caret" />
        </div>
      </>
    )
  }
}

export default Products;