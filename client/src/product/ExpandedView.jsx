import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

function ExpandedView({ setShowModal, largeImage }) {
  return (
    <div className="expandedview">
      hi
      <button onClick={() => { setShowModal(false); }}>close</button>
      <img src={largeImage} />
    </div>
  );
}

export default ExpandedView;
