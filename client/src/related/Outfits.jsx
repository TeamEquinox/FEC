import React, { useState, useEffect } from 'react';
import {RxCrossCircled, RxCaretLeft, RxCaretRight, RxPlus} from 'react-icons/Rx';
import StarRating from '../starRatings.jsx';
import helpers from '../clientSideHelpers.js';


const Outfits = ({ data = [], product, setoutfit }) => {

  // console.log('INSIDE OUTFITS PRODUCT IS', data);

  useEffect(() => {
    helpers.getOutfit(setoutfit);
  }, []);

  const handlerRemoveClick = (id) => {
    helpers.removeItemFromOutfit(id, setoutfit);
  };

  const handlerAddClick = () => {
    var newOutfit = helpers.extractOutfitData(product);
    helpers.saveItemToOutfit(newOutfit, setoutfit);
  };


  if (data.length === 0) {
    return (
      <>
        <h3 className="h3_outfit_title">Your Outfit</h3>
        <div className="div_card_container">
          <RxCaretLeft onClick={() => helpers.slideLeft('outfitSlider')} className="div_left_caret"/>
          <div id="outfitSlider" className="div_slider">
          <div>
              <div className="div_addOutfit_card" onClick={handlerAddClick}>
                <div className="div_add_outfit_action">
                  <RxPlus className="add_outfit_action" />
                </div>
                <div className="h3_add_outfit_action_header">
                  <h3 >Add to Outfit</h3>
                </div>
              </div>
            </div>
          </div>
          <RxCaretRight onClick={() => helpers.slideRight('outfitSlider')} className="div_right_caret"/>
        </div>
      </>
    )
  } else {
    return (
      <>
        <h3 className="h3_outfit_title">Your Outfit</h3>
        <div className="div_card_container">
          <RxCaretLeft onClick={() => helpers.slideLeft('outfitSlider')} className="div_left_caret"/>
          <div id="outfitSlider" className="div_slider">
            <div>
              <div className="div_addOutfit_card" onClick={handlerAddClick}>
                <div className="div_add_outfit_action">
                  <RxPlus className="add_outfit_action" />
                </div>
                <div className="h3_add_outfit_action_header">
                  <h3 >Add to Outfit</h3>
                </div>
              </div>
            </div>
            <div>
              {
                data.map((item) => {
                  var price = item.original_price;
                  var salesPrice = null;
                  if (item.sale_price !== 'N/A') {
                    salesPrice = item.sale_price;
                  }
                  return <div key={item.id} className="div_outfit_card" >
                    <div className="div_image_action_container">
                      <RxCrossCircled className="icon_action" onClick={() => handlerRemoveClick(item.id)}/>
                      <img className="img_card" src={item.image}></img>
                    </div>
                    <div className="div_info_container" >
                      <div className="div_related_category">Category: {item.category}</div>
                      <div className="div_related_name">Name: {item.name}</div>
                      { salesPrice !== null ? <div className="div_related_price"><span style={{color: 'red'}}>${salesPrice}</span> <span style={helpers.style}>${price}</span>
                      </div> : <div className="div_related_price"><span>${price}</span></div>}

                      <br></br>
                      <StarRating rating={helpers.configRatings(item.rating)} pixels={10} className="div_rating"/>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
          <RxCaretRight onClick={() => helpers.slideRight('outfitSlider')} className="div_right_caret"/>
        </div>
      </>
    )
  }
};

export default Outfits;