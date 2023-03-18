import React, { useState } from 'react';

const Modal = ({ setShowModal, compares, setDataToCompare }) => {
  console.log('COMPARE--------------->', compares);
 

  const handleCancelClick = () => {
    setShowModal(false);
  }

  let convertToObj = (arr) => {
    var result = {};
    arr.forEach((obj) => {
      result[obj.feature] = obj.value;
    })
    return result;
  }
  
  let compareObj = (obj1, obj2) => {
    let foundInBoth = [];
    let foundInFirst = [];
    let foundInSecond = [];

    let findLongest = (obj) => {
      return Object.keys(obj).length;
    }

    for (var key in obj1) {
      if (obj2[key]) {
        foundInBoth.push([obj1[key], key, obj2[key]]);
        delete obj2[key];
      } else {
        foundInFirst.push([obj1[key], key, ''])
      }
    }
    if (findLongest(obj2) > 0) {
      for (var key in obj2) {
        foundInSecond.push(['', key, obj2[key]]);
      }
    }
    return [...foundInBoth, ...foundInFirst, ...foundInSecond];
  }

  let modal = (currentProduct, relatedProduct) => {
    var result = [
      [currentProduct.name, 'Name', relatedProduct.name],
      [currentProduct.category, 'Category', relatedProduct.category],
      [currentProduct.description, 'Description', relatedProduct.description],
    ];
    var currentProductFeatures = convertToObj(currentProduct.features);
    var relatedProductFeatures = convertToObj(relatedProduct.features);
    let compareCurrentAndRelated = compareObj(currentProductFeatures, relatedProductFeatures);
    
    result = [...result, ...compareCurrentAndRelated];
    return result;
  }
  
  var check = Object.keys(compares[1]).length;
  var result;
  if (check > 0) {
    result = modal(compares[0], compares[1]);
  }
  
  console.log('inside modal function result!!!!!!!!!!!', result);
  if (!result) {
    return <div>
      Nothing to Compare
    </div>
  } else {
    return (
      
      <div className="div_modal_container">
        <div className="div_modal_title"><h5>Compare</h5></div>
        <div className="div_modal_X_button">
          <button className="button_modal" onClick={handleCancelClick}> X </button>  
        </div>
        <div className="div_modal_body">
          <table>
            {result.map((element) => {
              return <tr key={element[1]}>
                <td>{element[0]}</td>
                <td>{element[1]}</td>
                <td>{element[2]}</td>
              </tr>
            })}
          </table>
        </div>
      </div>
     
    )
  }
}

export default Modal;