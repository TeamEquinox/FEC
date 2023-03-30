import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

function Cart({ setCart }) {
  return (
    <div className="div__cart_view">
      <button onClick={() => { setCart(false); }}>close</button>
      {localStorage.getItem('cart')}
    </div>
  );
}

export default Cart;
