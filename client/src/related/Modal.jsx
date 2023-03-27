/* eslint-disable react/prop-types */
import React from 'react';
import { HiCheck } from 'react-icons/hi';

function Modal({ setShowModal, compares }) {
  // console.log('COMPARE--------------->', compares);

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

    const obj1Keys = Object.keys(obj1);
    obj1Keys.forEach((key) => {
      let bool1 = obj1[key];
      let bool2 = obj2[key];
      if (bool2) {
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
          bool2 = '';
        }
        foundInBoth.push([bool1, key, bool2]);
        // eslint-disable-next-line no-param-reassign
        delete obj2[key];
      } else {
        foundInFirst.push([bool1, key, '']);
      }
    });
    if (findLongest(obj2) > 0) {
      const obj2Keys = Object.keys(obj1);
      obj2Keys.forEach((key) => {
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

  const modal = (currentProduct, relatedProduct) => {
    let result = [
      [currentProduct.name, 'Name', relatedProduct.name],
      [currentProduct.category, 'Category', relatedProduct.category],
      [currentProduct.description, 'Description', relatedProduct.description],
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

  // console.log('inside modal function result!!!!!!!!!!!', result);
  if (!result) {
    return <div> Nothing to Compare </div>;
  }
  return (
    <div className="div_modal_container">
      <div className="div_modal_title"><h5>Compare</h5></div>
      <div className="div_modal_X_button">
        <button type="button" className="button_modal" onClick={handleCancelClick}> X </button>
      </div>
      <div className="div_modal_body">
        <table>
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

  );
}

export default Modal;
