import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';
import StyleList from "./StyleList.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const Style = ({ styles, setGallery, setLargeImage }) => {
  console.log('styles', styles)

  const [currStyle, setCurrStyle] = useState('')
  const [currPrice, setCurrPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [onSale, setOnSale] = useState(true)
  const [size, setSize] = useState([])

  return (
    < div className="div__size_quant">
      <div>{styles ? currPrice : null}</div>
      <div style={{
        textDecoration: onSale ? "line-through" : "none",
        color: onSale ? "red" : "black"
      }}>{styles ? salePrice : null}</div>
      <p>Style > {styles ? currStyle : null}</p>
      <div className="div__thumbnails">
        {styles ? styles.map((style) => {
          return (
            <StyleList style={style} setCurrStyle={setCurrStyle} setCurrPrice={setCurrPrice} setSalePrice={setSalePrice} setOnSale={setOnSale} setGallery={setGallery} setLargeImage={setLargeImage} key={style.style_id} setSize={setSize} />
          )
        }) : null}
      </div>

      <select className="select__size">
        <option>Select Size</option>
        {Object.values(size).map((value) => {
          // console.log('values', value)
          return (<option key={Math.floor(Math.random() * (1000 - 0 + 1) + 0)}>{value.size}</option>)
        })}
      </select>
      <select className="select__quantity">
        <option >Quantity</option>
        {Object.values(size).map((value) => {
          console.log('values', value)
          return (<option key={Math.floor(Math.random() * (1000 - 0 + 1) + 0)}>{value.quantity}</option>)
        })}

      </select>
      <br></br>
      <br></br>
      <button className="button__cart">Add to cart</button>
      <button className="button__star"><FontAwesomeIcon icon={regularStar} style={{ color: '#757575' }} /></button>
    </div >
  )

}

export default Style;