import React from 'react';
import {RxStar, RxCaretLeft, RxCaretRight} from 'react-icons/Rx';
import StarRating from '../starRatings.jsx';
// import configRatings from '../../../../helpers/relatedProductHelpers.js';


const Products = ({ relatedData, setShowModal, updates }) => {
  // console.log('inside Products Component', relatedData);

  var configRatings = (obj) => {
    var oneStar = Number(obj['1']);
    var twoStar = Number(obj['2']);
    var threeStar = Number(obj['3']);
    var fourStar = Number(obj['4']);
    var fiveStar = Number(obj['5']);
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
  if (!relatedData) {
    return (
      <div>
        Loading.....!
      </div>
    )
  } else {
    return (
      <div className="div_related_container">
        <RxCaretLeft onClick={slideLeft} className="div_left_caret"/>
        <div id="slider" className="div_slider">
        {
          relatedData.map((item) => {
            var price = item.original_price;
            if (item.sales_price !== 'N/A') {
              price = item.sales_price;
            }
            // console.log('ITEM=========>', item)
            return <div key={item.id} className="div_realated_card">
              <div className="div_related_image_action_container">
                <RxStar className="icon_related_action" onClick={ () => {
                  handleStarClick(item.id)} }/>
                <img className="img_related" src={item.photo}></img>
              </div>
              <div className="div_realated_info_container">
                <div className="div_related_category related_card">Category: {item.category}</div>
                <div className="div_related_name related_card">Name: {item.name}</div>
                <div className="div_related_price related_card">Price: {price}</div>
                <br></br>
                <StarRating rating={configRatings(item.rating)} pixels={10} className="div_related_rating"/>
              </div>
            </div>
          })
        }
        </div>
        <RxCaretRight onClick={slideRight} className="div_right_caret"/>
        {/* <Modal /> */}
      </div>
      
    )
  }
}

export default Products;