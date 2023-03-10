import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';

const Image = ({ photos }) => {
  return (
    <div className="div__image_container">
      <div className="div__large_image"><img className="img__gallery" src={photos ? photos[0].photos[0].url : null}></img></div>
      <div className="div__img_gallery_small">
        {photos ? photos[0].photos.map((photo) => {
          return (<img className="img__gallery_small" src={photo.thumbnail_url}></img>)
        }) : null}

      </div>
    </div>


  )
  console.log('photos', photos)

}

export default Image;