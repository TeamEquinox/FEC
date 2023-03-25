import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect, createRef } from 'react';
import StyleList from "./StyleList.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import $ from 'jquery'



const Style = ({ styles, setGallery, setLargeImage, largeImage }) => {
  console.log('styles', styles)

  const [currStyle, setCurrStyle] = useState(styles[0].name)
  const [currPrice, setCurrPrice] = useState(styles[0].original_price)
  const [salePrice, setSalePrice] = useState('')
  const [onSale, setOnSale] = useState(true)
  const [size, setSize] = useState(styles[0].skus)
  const [currSize, setCurrSize] = useState('')
  const [message, setMessage] = useState(false)
  const [value, setValue] = useState('Select Size')
  const [sku, setSku] = useState('')
  const [itemAdded, setItemAdded] = useState(false)

  let currQuant;

  const renderQuantity = (e) => {
    console.log('size', size)
    for (let sku in size) {
      if (size[sku].size === e.target.value) {
        // console.log(size[sku].quantity)
        setSku(sku)
        currQuant = size[sku].quantity
        if (currQuant <= 15) {
          for (var i = 1; i <= currQuant; i++) {
            var select = document.getElementById("select__quantity");
            var option = document.createElement("OPTION");
            select.options.add(option);
            option.text = i;
            option.value = i;
          }
        } else if (currQuant === 0) {
          var select = document.getElementById("select__quantity");
          var option = document.createElement("OPTION");
          select.options.add(option);
          option.text = 'Out of Stock';
        } else {
          for (var i = 1; i <= 15; i++) {
            var select = document.getElementById("select__quantity");
            var option = document.createElement("OPTION");
            select.options.add(option);
            option.text = i;
            option.value = i;
          }
        }
      }
    }
  }

  const clearOptions = () => {
    var select = document.getElementById("select__quantity");
    var i, length = select.options.length - 1;
    for (i = length; i >= 0; i--) {
      select.remove(i);
    }
  }
  // $('.button__cart').click(function (e) {
  //   $('#select__size').attr('size', $('option').length);
  // });

  const errorMessage = () => {
    let sizeSelector = document.getElementById("select__size").value
    if (sizeSelector === "Select Size") {
      setMessage(true);
      // document.getElementById("select__size").focus();
    } else {
      setMessage(false);

    }
  }

  const addItem = () => {
    localStorage.removeItem('cart')
    let cart = [];
    let sizeSelector = document.getElementById("select__size").value
    let quantitySelector = document.getElementById("select__quantity").value
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({ 'sku': sku, 'style': currStyle, 'quantity': quantitySelector, 'size': sizeSelector, 'price': currPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
  }


  return (
    < div className="div__size_quant">
      {itemAdded ? <div className="div__item_added">1</div> : null}
      <div>{currPrice}</div>
      <div style={{
        textDecoration: onSale ? "line-through" : "none",
        color: onSale ? "red" : "black"
      }}>{salePrice}</div>
      <p>Style > {currStyle}</p>
      <div className="div__thumbnails">
        {styles.map((style) => {
          return (
            <StyleList style={style} setCurrStyle={setCurrStyle} setCurrPrice={setCurrPrice} setSalePrice={setSalePrice} setOnSale={setOnSale} setGallery={setGallery} setLargeImage={setLargeImage} key={style.style_id} setSize={setSize} largeImage={largeImage} />
          )
        })}
      </div>

      <select id="select__size" value={value} className="dropDown" onChange={(e) => { setValue(e.target.value); clearOptions(); renderQuantity(e); errorMessage(); setCurrSize(e.target.value); }}>

        {/* onFocus={(e) => { e.target.size = styles.length; document.getElementById('select__size').classList.remove('dropDown'); document.getElementById('select__size').classList.add('dropDown2'); }} onBlur={(e) => { e.target.size = '0'; document.getElementById('select__size').classList.remove('dropDown2'); document.getElementById('select__size').classList.add('dropDown'); }} */}
        <option className="select__size" >Select Size</option>
        {Object.values(size).map((value) => {
          return (<option className="option__size" key={Math.floor(Math.random() * (10000 - 0 + 1) + 0)} onChange={(e) => { }}>{value.size}</option>)
        })}
      </select>
      {/* <select id="select__quantity" onClick={() => { console.log('blur'); document.getElementById("select__size").blur(); }}> */}
      <select id="select__quantity">

        <option >Quantity</option>
      </select>
      {message ? <p className="p__message">Please select a size and quantity</p> : null}

      <br></br>
      <br></br>
      <button className="button__cart" onClick={(e) => {
        e.preventDefault(); errorMessage(); addItem(); setItemAdded(true)
      }}>Add to cart</button>
      <button className="button__star"><FontAwesomeIcon icon={regularStar} style={{ color: '#757575' }} /></button>
    </div >
  )

}

export default Style;