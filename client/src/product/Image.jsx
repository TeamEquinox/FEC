import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from 'react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/Rx';


const Image = ({ photos, gallery, largeImage, setLargeImage }) => {
  console.log('galleryHERE', gallery)

  const [showLeftCaret, setShowLeftCaret] = useState(true)
  const [showRightCaret, setShowRightCaret] = useState(true)

  let nextIndex;
  let nextPhoto;

  const caretRight = () => {
    let currLargeImage = document.getElementsByClassName("img__gallery")[0].src
    // console.log('curr', currLargeImage)
    if (!gallery.length) {
      if (photos[0].photos) {
        if (showLeftCaret === false) {
          setShowLeftCaret(true)
        }
        photos[0].photos.forEach((photo, index) => {
          if (photo.url === currLargeImage) {
            if (index === photos[0].photos.length - 2) {
              setShowRightCaret(!showRightCaret)
            }
            nextIndex = index + 1;
            nextPhoto = photos[0].photos[nextIndex].url;
            setLargeImage(photos[0].photos[nextIndex].url)
          }
        })
      }
    } else if (gallery.length > 0) {
      if (showLeftCaret === false) {
        setShowLeftCaret(true)
      }
      gallery.forEach((photo, index) => {
        if (photo.url === currLargeImage) {
          if (index === gallery.length - 2) {
            setShowRightCaret(!showRightCaret)
          }

          nextIndex = index + 1;
          nextPhoto = gallery[nextIndex].url;
          setLargeImage(gallery[nextIndex].url)
        }
      })
    }
  }

  const caretLeft = () => {
    let currLargeImage = document.getElementsByClassName("img__gallery")[0].src
    if (!gallery.length) {
      if (photos[0].photos) {
        if (showRightCaret === false) {
          setShowRightCaret(true)
        }
        photos[0].photos.forEach((photo, index) => {
          if (photo.url === currLargeImage) {
            if (index === 1) {
              setShowLeftCaret(!showLeftCaret)
            }
            nextIndex = index - 1;
            nextPhoto = photos[0].photos[nextIndex].url;
            setLargeImage(photos[0].photos[nextIndex].url)
          }
        })
      }
    } else if (gallery.length > 0) {
      if (showRightCaret === false) {
        setShowRightCaret(true)
      }
      gallery.forEach((photo, index) => {
        if (photo.url === currLargeImage) {
          if (index === 1) {
            setShowLeftCaret(!showLeftCaret)
          }
          nextIndex = index - 1;
          nextPhoto = gallery[nextIndex].url;
          setLargeImage(gallery[nextIndex].url)
        }
      })
    }
    console.log('arge', largeImage)

  }
  // console.log('galleryHERE', gallery)
  if (gallery.length) {
    return (

      <div className="div__image_container">{showLeftCaret ? <RxCaretLeft className="caret__left" onClick={() => { caretLeft() }} /> : null}{showRightCaret ? <RxCaretRight className="caret__right" onClick={() => { caretRight() }} /> : null}
        <div className="div__large_image"><img className="img__gallery" src={largeImage}></img></div>
        <div className="div__img_gallery_small">
          {gallery.length ? gallery.map((photo) => {
            return (
              <img className="img__gallery_small" src={photo.thumbnail_url} onClick={(e) => { e.preventDefault(); setLargeImage(photo.thumbnail_url) }} key={photo.thumbnail_url}></img>
            )
          }) : null}

        </div>
      </div >
    )
  } else {
    return (

      <div className="div__image_container">{showLeftCaret ? <RxCaretLeft className="caret__left" onClick={() => { caretLeft() }} /> : null}
        {showRightCaret ? <RxCaretRight className="caret__right" onClick={() => { caretRight(); setLargeImage(nextPhoto) }} /> : null}
        <div className="div__large_image"> <img className="img__gallery" src={largeImage ? largeImage : photos[0].photos[0].url}></img>
        </div>


        <div className="div__img_gallery_small">
          {photos[0].photos ? photos[0].photos.map((photo) => {
            return (
              <img className="img__gallery_small" src={photo.thumbnail_url} onClick={(e) => { e.preventDefault(); setLargeImage(photo.thumbnail_url) }} key={photo.thumbnail_url}></img>
            )
          }) : null}

        </div>
      </div >


    )

  }

}

export default Image;