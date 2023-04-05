/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { RxStar, RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { StarRating } from '../starRatings';
import helpers from '../clientSideHelpers';

function Products({
  relatedData, setShowModal, updates, updateProduct, product,
}) {
  // console.log('MOCHDATA=====>', relatedData);
  const [caretDisplay, setCaretDisplay] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

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

  const handleStarClick = (item) => {
    setShowModal(true);
    updates(item);
  };
  const handleRelatedCardClick = (id) => {
    updateProduct(id);
  };

  if (!relatedData) {
    return (
      <div>
        Loading.....!
      </div>
    );
  }
  return (
    <>
      <h3 className="h3_related_title">Related Products</h3>
      <div className="div_card_container">
        {caretDisplay === 0 ? <RxCaretLeft onClick={() => handleLeftClick('slider')} className="div_left_caret_noShow" />
          : <RxCaretLeft onClick={() => handleLeftClick('slider')} className="div_left_caret" />}
        <div id="slider" className="div_slider">
          <div>
            {

              // eslint-disable-next-line array-callback-return, consistent-return
              relatedData.map((item) => {
                const price = item.original_price;
                let salesPrice = null;
                if (item.sale_price !== 'N/A') {
                  salesPrice = item.sale_price;
                }
                if (item.photo !== 'N/A' && product[0].id !== item.id) {
                  return (
                    <div key={item.id} className="div_card">
                      <div className="div_image_action_container">
                        <RxStar
                          className="icon_action"
                          onClick={() => {
                            handleStarClick(item.id);
                          }}
                        />
                        {/* eslint-disable-next-line max-len */}
                        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                        <img className="img_card" src={item.photo} alt="RelatedImage" onClick={() => { handleRelatedCardClick(item.id); }} />
                      </div>
                      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                      <div className="div_info_container" onClick={() => { handleRelatedCardClick(item.id); }}>
                        <div className="div_related_category related_card">
                          {/* Category: */}
                          {item.category}
                        </div>
                        <div className="div_related_name related_card">
                          {/* Name: */}
                          {item.name}
                        </div>
                        { salesPrice !== null ? (
                          <div className="div_related_price related_card">
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
                          <div className="div_related_price related_card">
                            <span>
                              $
                              {price}
                            </span>
                          </div>
                        )}
                        <br />
                        <div className="div_rating"><StarRating rating={helpers.configRatings(item.rating)} id="related_star" pixels={10} /></div>
                      </div>
                    </div>
                  );
                }
              })
            }
          </div>
        </div>
        {caretDisplay === maxScroll && maxScroll !== 0 ? <RxCaretRight onClick={() => handleRightClick('slider')} className="div_right_caret_noShow" />
          : <RxCaretRight onClick={() => handleRightClick('slider')} className="div_right_caret" />}
      </div>
    </>
  );
}

export default Products;
