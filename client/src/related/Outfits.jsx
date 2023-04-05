/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  RxCrossCircled, RxCaretLeft, RxCaretRight, RxPlus,
} from 'react-icons/rx';
import { StarRating } from '../starRatings';
import helpers from '../clientSideHelpers';

function Outfits({ data = [], product, setoutfit }) {
  const [caretDisplay, setCaretDisplay] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    helpers.getOutfit(setoutfit);
  }, []);

  const handleRightClick = (elem) => {
    const slideRight = helpers.slideRight(elem);
    const max = slideRight.scrollWidth - slideRight.clientWidth;
    setMaxScroll(max);
    let newSlider = caretDisplay;
    newSlider += 181;
    if (newSlider >= max) {
      newSlider = max;
    }
    setCaretDisplay(newSlider);
  };

  const handleLeftClick = (elem) => {
    helpers.slideLeft(elem);
    let newSlider2 = caretDisplay;
    newSlider2 -= 181;
    if (newSlider2 <= 0) {
      newSlider2 = 0;
    }
    setCaretDisplay(newSlider2);
  };

  const handlerRemoveClick = (id) => {
    helpers.removeItemFromOutfit(id, setoutfit);
  };

  const handlerAddClick = () => {
    const newOutfit = helpers.extractOutfitData(product);
    helpers.saveItemToOutfit(newOutfit, setoutfit);
  };

  if (data.length === 0) {
    return (
      <>
        <h3 className="h3_outfit_title">Your Outfit</h3>
        <div className="div_card_container">
          <RxCaretLeft onClick={() => helpers.slideLeft('outfitSlider')} className="div_left_caret_noShow" />
          <div id="outfitSlider" className="div_slider">
            <div>
              <div className="div_addOutfit_card" onClick={handlerAddClick}>
                <div className="div_add_outfit_action">
                  <RxPlus className="add_outfit_action" />
                </div>
                <div className="h3_add_outfit_action_header">
                  <h3>Add to Outfit</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <h3 className="h3_outfit_title">Your Outfit</h3>
      <div className="div_card_container">
        {caretDisplay === 0 ? <RxCaretLeft onClick={() => handleLeftClick('outfitSlider')} className="div_left_caret_noShow" />
          : <RxCaretLeft onClick={() => handleLeftClick('outfitSlider')} className="div_left_caret" />}
        <div id="outfitSlider" className="div_slider">
          <div>
            <div className="div_addOutfit_card" onClick={() => handlerAddClick()}>
              <div className="div_add_outfit_action">
                <RxPlus className="add_outfit_action" />
              </div>
              <div className="h3_add_outfit_action_header">
                <h3>Add to Outfit</h3>
              </div>
            </div>
          </div>
          <div>
            {
                data.map((item) => {
                  const price = item.original_price;
                  let salesPrice = null;
                  if (item.sale_price !== 'N/A') {
                    salesPrice = item.sale_price;
                  }
                  return (
                    <div key={item.id} className="div_outfit_card">
                      <div className="div_image_action_container">
                        <RxCrossCircled className="icon_action" onClick={() => handlerRemoveClick(item.id)} />
                        <img className="img_card" alt="" src={item.image} />
                      </div>
                      <div className="div_info_container">
                        <div className="div_related_category">
                          {/* Category: */}
                          {item.category}
                        </div>
                        <div className="div_related_name">
                          {/* Name: */}
                          {item.name}
                        </div>
                        { salesPrice !== null ? (
                          <div className="div_related_price">
                            <span style={{ color: 'red' }}>
                              $
                              {salesPrice}
                            </span>
                            {' '}
                            <span style={helpers.style}>
                              $
                              {price}
                            </span>
                          </div>
                        ) : (
                          <div className="div_related_price">
                            <span>
                              $
                              {price}
                            </span>
                          </div>
                        )}

                        <br />
                        <div className="div_rating"><StarRating rating={helpers.configRatings(item.rating)} id="related_star" pixels={10}/></div>
                      </div>
                    </div>
                  );
                })
              }
          </div>
        </div>
        {caretDisplay === maxScroll && maxScroll !== 0 ? <RxCaretRight onClick={() => handleRightClick('outfitSlider')} className="div_right_caret_noShow" />
          : <RxCaretRight onClick={() => handleRightClick('outfitSlider')} className="div_right_caret" />}
      </div>
    </>
  );
}

export default Outfits;
