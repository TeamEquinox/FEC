import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';
import StyleList from "./StyleList.jsx"

const Style = ({ styles }) => {
  console.log('styles', styles)

  return (
    < div >

      {styles ? styles.map((style) => {
        return (

          <StyleList style={style} />



        )
      }) : null}
      <select className="select__size">
        <option>Select Size</option>
      </select>
      <select className="select__quantity">
        <option >Quantity</option>
      </select>
      <br></br>
      <br></br>
      <button className="button__cart">Add to cart</button>
      <button>Favorite</button>
    </div >
  )

}

export default Style;