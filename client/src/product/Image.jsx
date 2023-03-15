import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';

const Image = ({ photos, gallery, largeImage, setLargeImage }) => {
  console.log('galleryHERE', gallery)
  if (gallery.length) {
    return (
      <div className="div__image_container">
        <div className="div__large_image"><img className="img__gallery" src={largeImage}></img></div>
        <div className="div__img_gallery_small">
          {gallery.length ? gallery.map((photo) => {
            return (
              <img className="img__gallery_small" src={photo.thumbnail_url} onClick={(e) => { e.preventDefault(); setLargeImage(photo.thumbnail_url) }}></img>
            )
          }) : null}

        </div>
      </div >


    )

  } else {
    return (
      <div className="div__image_container">
        <div className="div__large_image"><img className="img__gallery" src={photos[0].photos[0].url}></img></div>
        <div className="div__img_gallery_small">
          {photos[0].photos ? photos[0].photos.map((photo) => {
            return (
              <img className="img__gallery_small" src={photo.thumbnail_url} onClick={(e) => { e.preventDefault(); setLargeImage(photo.thumbnail_url) }}></img>
            )
          }) : null}

        </div>
      </div >


    )
  }

}

export default Image;