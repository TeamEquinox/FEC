import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';

const Cart = ({ setCart }) => {
  return (
    <div className="expandedview">hi
      <button onClick={() => { setCart(false) }}>close</button>
      {localStorage.getItem('cart')}
    </div>
  )
}

export default Cart;