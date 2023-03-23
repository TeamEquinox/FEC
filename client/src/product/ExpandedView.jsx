import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';

const ExpandedView = ({ setShowModal, largeImage }) => {
  return (
    <div className="expandedview">hi
      <button onClick={() => { setShowModal(false) }}>close</button>
      <img src={largeImage}></img>
    </div>
  )
}

export default ExpandedView;