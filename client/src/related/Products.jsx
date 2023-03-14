import React from 'react';
import {RxStar} from 'react-icons/Rx';
import StarRating from '../starRatings.jsx'


const Products = ({ relatedData }) => {
  // console.log('inside Products Component', relatedData);

  var configRatings = (obj) => {
    var oneStar = Number(obj['1']);
    var twoStar = Number(obj['2']);
    var threeStar = Number(obj['3']);
    var fourStar = Number(obj['4']);
    var fiveStar = Number(obj['5']);
    var actualRating = ((oneStar * 1) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4) + (fiveStar * 5));
    // console.log('actualRating', actualRating);
    var totalPossibleRating = ((oneStar + twoStar + threeStar + fourStar + fiveStar) * 5);
    // console.log('totalPossibleRating', totalPossibleRating);
    var result = Math.round((actualRating/totalPossibleRating * 5) * 10) / 10;
    return result;
  }
  // console.log('ConfigRatings----->', configRatings({1: '3', 2: '1', 3: '1', 4: '2', 5: '8'}));
  return (
    <div>
      {
        relatedData.map((item) => {
          var price = item.original_price;
          if (item.sales_price !== 'N/A') {
            price = item.sales_price;
          }
          // console.log('ITEM=========>', item)
          return <div key={item.id} className="div_realated_container">
            <div className="div_related_image_action_container">
              <RxStar className="icon_related_action"/>
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
    
  )
}

export default Products;