/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { StarRating } from '../starRatings';
import helpers from '../clientSideHelpers';

function Modal({ setShowModal, compares }) {
  const handleCancelClick = () => {
    setShowModal(false);
  };

  const convertToObj = (arr) => {
    const result = {};
    arr.forEach((obj) => {
      result[obj.feature] = obj.value;
    });
    return result;
  };

  const compareObj = (obj1, obj2) => {
    const foundInBoth = [];
    const foundInFirst = [];
    const foundInSecond = [];

    const findLongest = (obj) => Object.keys(obj).length;
    const keys = Object.keys(obj1);
    keys.forEach((key) => {
      let bool1 = obj1[key];
      let bool2 = obj2[key];
      if (obj2[key]) {
        if (bool1 === true) {
          bool1 = <HiCheck />;
        }
        if (bool1 === false) {
          bool1 = '';
        }
        if (bool2 === true) {
          bool2 = <HiCheck />;
        }
        if (bool2 === false) {
          bool1 = '';
        }
        foundInBoth.push([bool1, key, bool2]);
        delete obj2[key];
      } else {
        foundInFirst.push([bool1, key, '']);
      }
    });
    if (findLongest(obj2) > 0) {
      const keys2 = Object.keys(obj2);
      keys2.forEach((key) => {
        // let bool1 = obj1[key];
        let bool2 = obj2[key];
        if (bool2 === true) {
          bool2 = <HiCheck />;
        }
        if (bool2 === false) {
          bool2 = '';
        }
        foundInSecond.push(['', key, bool2]);
      });
    }
    return [...foundInBoth, ...foundInFirst, ...foundInSecond];
  };
  let productName = '';
  let relatedProductName = '';
  const modal = (currentProduct, relatedProduct) => {
    productName = currentProduct.name;
    relatedProductName = relatedProduct.name;
    let result = [
      [currentProduct.name, '', relatedProduct.name],
      [currentProduct.slogan, 'Slogan', relatedProduct.slogan],
      [currentProduct.category, 'Category', relatedProduct.category],
      [currentProduct.description, 'Description', relatedProduct.description],
      [currentProduct.default_price, 'Price', relatedProduct.default_price],
      [currentProduct.recommended.true, 'Recommended Yes', relatedProduct.recommended.true],
      [currentProduct.recommended.false, 'Recommended No', relatedProduct.recommended.false],
      [helpers.configRatings(currentProduct.ratings),
        'Overall Ratings',
        helpers.configRatings(relatedProduct.ratings),
      ],
    ];
    const currentProductFeatures = convertToObj(currentProduct.features);
    const relatedProductFeatures = convertToObj(relatedProduct.features);
    const compareCurrentAndRelated = compareObj(currentProductFeatures, relatedProductFeatures);

    result = [...result, ...compareCurrentAndRelated];
    return result;
  };

  const check = Object.keys(compares[1]).length;
  let result;
  if (check > 0) {
    result = modal(compares[0], compares[1]);
  }

  if (!result) {
    return (
      <div>
        Nothing to Compare
      </div>
    );
  }
  return (

    <div className="div_modal_container">
      <div className="test">
        <div>
          <div>
            <span>Compare</span>
            <button type="button" className="button_modal" onClick={handleCancelClick}> X </button>
          </div>
          <br />
          <div>
            <div className="span_currentProduct">{productName} -- vs --  {relatedProductName}</div>
          </div>
        </div>
        <br />
        <div className="div_modal_body">
          <table className="table">
            <tbody>
              {result.map((element) => (
                <tr key={element[1]}>
                  <td>{element[0]}</td>
                  <td>{element[1]}</td>
                  <td>{element[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default Modal;
