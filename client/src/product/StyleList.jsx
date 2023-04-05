import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { RxCheckCircled } from 'react-icons/rx';

function StyleList({
  style, setCurrStyle, setCurrPrice, setSalePrice, setOnSale, setGallery, setLargeImage, setSize, largeImage, setOriginalGallery, originalGallery
}) {
  const checkStyle = (url) => {
    if (largeImage && document.getElementById(`check-${largeImage}`)) {
      document.getElementById(`check-${largeImage}`).classList.remove('check_circled2');
      document.getElementById(`check-${largeImage}`).classList.add('check_circled');
      document.getElementById(`check-${url}`).classList.remove('check_circled');
      document.getElementById(`check-${url}`).classList.add('check_circled2');
    }

    if (document.getElementById(`check-${largeImage}`) === null) {
      const array = document.getElementsByClassName('check_circled2');
      for (let i = 0; i < array.length; i++) {
        if (array[i].id !== document.getElementById(`check-${url}`).id) {
          document.getElementById(`${array[i].id}`).remove('check_circled2');
          document.getElementById(`${array[i].id}`).add('check_circled')
          console.log('removed');
          document.getElementById(`check-${url}`).classList.remove('check_circled');
          document.getElementById(`check-${url}`).classList.add('check_circled2');
        }
      }
    }
  };

  const saleChecker = () => {
    if (style.sale_price !== null) {
      setSalePrice(style.sale_price);
      setOnSale(true);
    } else {
      setSalePrice('');
    }
  };

  // console.log('largeimage', largeImage);

  return (

    <div
      className="div__style_container"
      onClick={(e) => {
        e.preventDefault(); setCurrStyle(style.name); saleChecker(); setCurrPrice(style.original_price); setLargeImage(style.photos[0].url); setOriginalGallery(style.photos); setSize(style.skus); checkStyle(style.photos[0].url);
      }}
    >
      {' '}
      <RxCheckCircled id={`check-${style.photos[0].url}`} className="check_circled" />
      <img className="img__style" src={style ? style.photos[0].thumbnail_url : null} alt="circle style images"/>
      <br />
      <br />
      <br />
      <br />
    </div>

  );
}

export default StyleList;
