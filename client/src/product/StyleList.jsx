import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';

const StyleList = ({ style, setCurrStyle, setCurrPrice, setSalePrice, setOnSale, setGallery, setLargeImage }) => {

  const saleChecker = () => {
    if (style.sale_price !== null) {
      setSalePrice(style.sale_price)
      setOnSale(true)
      // saleStyle()
    } else {
      setSalePrice('')
    }
  }


  return (
    <div className="div__style_container" onClick={(e) => { e.preventDefault(); setCurrStyle(style.name); saleChecker(); setCurrPrice(style.original_price); setLargeImage(style.photos[0].url); setGallery(style.photos) }}>

      <img className="img__style" src={style ? style.photos[0].thumbnail_url : null} ></img>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div >
  )
}

export default StyleList;