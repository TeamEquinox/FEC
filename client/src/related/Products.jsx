import React from 'react';
import {RxStar, RxCaretLeft, RxCaretRight} from 'react-icons/Rx';
// import {MdImageNotSupported} from 'react-icons/Md';
import StarRating from '../starRatings.jsx';
// import configRatings from '../../../../helpers/relatedProductHelpers.js';


const Products = ({ relatedData, setShowModal, updates, updateProduct }) => {
  // console.log('inside Products Component', relatedData);

  var style = {
    textDecoration: "line-through"
  };

  var configRatings = (obj) => {
    var oneStar = Number(obj['1']);
    if (!oneStar) {
      oneStar = 0;
    }
    var twoStar = Number(obj['2']);
    if (!twoStar) {
      twoStar = 0;
    }
    var threeStar = Number(obj['3']);
    if (!threeStar) {
      threeStar = 0;
    }
    var fourStar = Number(obj['4']);
    if (!fourStar) {
      fourStar = 0;
    }
    var fiveStar = Number(obj['5']);
    if (!fiveStar) {
      fiveStar = 0;
    }
    var actualRating = ((oneStar * 1) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4) + (fiveStar * 5));
    var totalPossibleRating = ((oneStar + twoStar + threeStar + fourStar + fiveStar) * 5);
    var result = Math.round((actualRating/totalPossibleRating * 5) * 10) / 10;
    return result;
  }
  // console.log('ConfigRatings----->', configRatings({1: '3', 2: '1', 3: '1', 4: '2', 5: '8'}));
  
  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 190;
  }

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 190
  }

  const handleStarClick = (item) => {
    setShowModal(true);
    updates(item);
    // console.log('eeeeeeee======-=-->>>', item);
  }
  const handleRelatedCardClick = (id) => {
    // alert(`this item has been clicked ${id}`)
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
        <h3>Related Products</h3>
        <div className="div_card_container">
          <RxCaretLeft onClick={slideLeft} className="div_left_caret"/>
          <div id="slider" className="div_slider">
          {
            relatedData.map((item) => {
              var price = item.original_price;
              var salesPrice = null;
              if (item.sale_price !== 'N/A') {
                salesPrice = item.sale_price;
              }
              if (item.photo !== 'N/A') {
              return <div key={item.id} className="div_related_card" >
                <div className="div_image_action_container">
                  <RxStar className="icon_action" onClick={ () => {
                    handleStarClick(item.id)} }/>
                  <img className="img_card" src={item.photo} onClick={() => {handleRelatedCardClick(item.id)}}></img>
                </div>
                <div className="div_info_container" onClick={() => {handleRelatedCardClick(item.id)}}>
                  <div className="div_related_category related_card">Category: {item.category}</div>
                  <div className="div_related_name related_card">Name: {item.name}</div>
                  { salesPrice !== null ? <div className="div_related_price related_card"><span style={{color: 'red'}}>${salesPrice}</span> <span style={style}>${item.original_price}</span>
                      </div> : <div className="div_related_price related_card"><span>${item.original_price}</span></div>}
                  <br></br>
                  <StarRating rating={configRatings(item.rating)} pixels={10} className="div_rating"/>
                </div>
              </div>
              }
            })
          }
          </div>
          <RxCaretRight onClick={slideRight} className="div_right_caret"/>
        </div>
      </>
    )
  }
}

export default Products;