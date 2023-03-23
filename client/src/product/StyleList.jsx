import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';
import { RxCheckCircled } from 'react-icons/Rx';

const StyleList = ({ style, setCurrStyle, setCurrPrice, setSalePrice, setOnSale, setGallery, setLargeImage, setSize, largeImage }) => {

  // const [selected, setSelected] = useState(false)

  const checkStyle = (url) => {
    if (largeImage) {
      document.getElementById(`check-${largeImage}`).classList.remove('check_circled2')
      document.getElementById(`check-${largeImage}`).classList.add('check_circled')
      setLargeImage(url);
      document.getElementById(`check-${url}`).classList.remove('check_circled')
      document.getElementById(`check-${url}`).classList.add('check_circled2')
    }
  }

  const saleChecker = () => {
    if (style.sale_price !== null) {
      setSalePrice(style.sale_price)
      setOnSale(true)
    } else {
      setSalePrice('')
    }
  }

  console.log('largeimage', largeImage)
  return (

    < div className="div__style_container" onClick={(e) => {
      e.preventDefault(); console.log('e', e.target.currentSrc
      ); setCurrStyle(style.name); saleChecker(); setCurrPrice(style.original_price); setLargeImage(style.photos[0].url); setGallery(style.photos); setSize(style.skus); checkStyle(style.photos[0].url)
    }}>  <RxCheckCircled id={`check-${style.photos[0].url}`} className="check_circled" />
      <img className="img__style" src={style ? style.photos[0].thumbnail_url : null} ></img>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div >

  )
}

export default StyleList;