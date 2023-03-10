import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';

const StyleList = ({ style }) => {
  return (
    <div className="div__style_container" >
      <img className="img__style" src={style ? style.photos[0].thumbnail_url : null}></img>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div >
  )
}

export default StyleList;