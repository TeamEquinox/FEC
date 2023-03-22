import React, { useState } from 'react';
import {RxCrossCircled, RxCaretLeft, RxCaretRight, RxPlus} from 'react-icons/Rx';
import StarRating from '../starRatings.jsx';

const Outfits = ({}) => {
  // console.log('inside Products Component', relatedData);
  // const [sale, setSale] = useState(false);

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
    var slider = document.getElementById('outfitSlider');
    slider.scrollLeft = slider.scrollLeft - 190;
  }

  const slideRight = () => {
    var slider = document.getElementById('outfitSlider');
    slider.scrollLeft = slider.scrollLeft + 190
  }

  const handlerRemoveClick = () => {
    alert('trying to remove this card')
  }
  const handlerAddClick = () => {
    alert('Add this card to Outfit list')
  }
  
  // const handleRelatedCardClick = (id) => {
  //   // alert(`this item has been clicked ${id}`)
  //   updateProduct(id);
  // }
const mochData = [
  {
    id: 1,
    category: 'fun',
    name: 'Slater',
    'original_price': 65,
    'sale_price': 55,
    image: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    rating: 3.5
  }, 
  {
    id: 2,
    category: 'Food',
    name: 'Pizza',
    'original_price': 12,
    'sale_price': 10,
    image: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    rating: 5
  }, 
  {
    id: 3,
    category: 'Pants',
    name: 'Jeans',
    'original_price': 65,
    'sale_price': 'N/A',
    image: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    rating: 4.5
  }
]
 
    return (
      <div className="div_card_container">
        <RxCaretLeft onClick={slideLeft} className="div_left_caret"/>
        <div id="outfitSlider" className="div_slider">
          <div className="div_add_outfit_card">
            <div className="div_image_action_container">
            <RxPlus className="add_outfit_action" onClick={handlerAddClick}/>
            </div>
            <div className="div_info_container">
            <h3 className="add_outfit_action_header">Add to Outfit</h3>
            </div>
          </div>
            {
              mochData.map((item) => {
                // console.log('ITEM=========>', item) 
                var price = item.original_price;
                var salesPrice = null;
                if (item.sale_price !== 'N/A') {
                  salesPrice = item.sale_price;
                }
          
                return <div key={item.id} className="div_outfit_card" >
                  <div className="div_image_action_container">
                    <RxCrossCircled className="icon_action" onClick={handlerRemoveClick}/>
                    <img className="img_card" src={item.image}></img>
                  </div>
                  <div className="div_info_container" >
                    <div className="div_related_category related_card">Category: {item.category}</div>
                    <div className="div_related_name related_card">Name: {item.name}</div>
                    { salesPrice !== null ? <div className="div_related_price related_card"><span style={{color: 'red'}}>${salesPrice}</span> <span style={style}>${item.original_price}</span>
                    </div> : <div className="div_related_price related_card"><span>${item.original_price}</span></div>}
                    
                    <br></br>
                    <StarRating rating={item.rating} pixels={10} className="div_rating"/>
                  </div>
                </div>
              }) 
            }
        </div>
        <RxCaretRight onClick={slideRight} className="div_right_caret"/>
      </div>
      
    )
  
}

export default Outfits;