import React, { useState, useEffect, Component } from 'react';
import ReactDom from 'react-dom';
import { RxCross1 } from 'react-icons/rx';
import {
  RxCaretLeft, RxCaretRight
} from 'react-icons/Rx';

function ExpandedView({ setShowModal, largeImage, zoom, setZoom, originalGallery, setLargeImage, setShowLeftCaret, setShowRightCaret }) {
  const [backgroundPosition, setBackgroundPosition] = useState({
    backgroundPosition: `0% 0%`,
    'background-size': '100%',
    backgroundImage: `url(${largeImage})`
  })
  const [showLeftCaretExpanded, setShowLeftCaretExpanded] = useState(true);
  const [showRightCaretExpanded, setShowRightCaretExpanded] = useState(true);

  const zoomIn = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const horizontalAxis = (e.pageX - left) / width * 100
    const verticalAxis = (e.pageY - top) / height * 100
    setBackgroundPosition({
      backgroundPosition: `${horizontalAxis}% ${verticalAxis}%`,
      'background-size': '250%',
      backgroundImage: `url(${largeImage})`
    });
  };

  let nextIndex;
  let nextPhoto;

  const caretRight = () => {
    if (!originalGallery.length) {
      if (photos[0].photos) {
        if (showLeftCaretExpanded === false) {
          setShowLeftCaretExpanded(true);
        }
        photos[0].photos.forEach((photo, index) => {
          if (photo.url.slice(0, 60) === largeImage.slice(0, 60)) {
            if (index === photos[0].photos.length - 2) {
              setShowRightCaretExpanded(!showRightCaret);
            }
            nextIndex = index + 1;
            nextPhoto = photos[0].photos[nextIndex].url;
            setLargeImage(photos[0].photos[nextIndex].url);
          }
        });
      }
    } else if (originalGallery.length > 0) {
      if (showLeftCaretExpanded === false) {
        setShowLeftCaretExpanded(true);
      }
      originalGallery.forEach((photo, index) => {
        if (photo.url.slice(0, 60) === largeImage.slice(0, 60)) {
          if (index === originalGallery.length - 2) {
            setShowRightCaretExpanded(false);
          }
          nextIndex = index + 1;
          nextPhoto = originalGallery[nextIndex].url;
          setLargeImage(originalGallery[nextIndex].url);
          console.log('large image is set');
        }
      });
    }
  };
  const caretLeft = () => {
    if (!originalGallery.length) {
      if (photos[0].photos) {
        if (showRightCaretExpanded === false) {
          setShowRightCaretExpanded(true);
        }
        photos[0].photos.forEach((photo, index) => {
          if (photo.url.slice(0, 60) === largeImage.slice(0, 60)) {
            if (index === 1) {
              setShowLeftCaretExpanded(!showLeftCaretExpanded);
            }
            nextIndex = index - 1;
            nextPhoto = photos[0].photos[nextIndex].url;
            setLargeImage(photos[0].photos[nextIndex].url);
          }
        });
      }
    } else if (gallery.length > 1) {
      if (showRightCaretExpanded === false) {
        setShowRightCaretExpanded(true);
      }
      originalGallery.forEach((photo, index) => {
        if (photo.url.slice(0, 60) === largeImage.slice(0, 60)) {
          console.log('arge', largeImage);
          console.log('url', photo.url);
          if (index === 1) {
            setShowLeftCaretExpanded(!showLeftCaretExpanded);
          }
          nextIndex = index - 1;
          nextPhoto = gallery[nextIndex].url;
          setLargeImage(gallery[nextIndex].url);
          console.log('large image is set');
        }
      });
    }
  };


  const switchGalleryBack = () => {
    console.log('switch')
    const imgArray = document.getElementsByClassName('img__id');
    for (let i = 0; i < imgArray.length; i++) {
      document.getElementsByClassName('img__id')[i].className = 'img__id img__gallery_small';
    }
  };




  return (
    <div className="div__expandedview" style={zoom ? backgroundPosition : null} onMouseMove={ (zoom) ? zoomIn : null} onClick={zoom ? () => {setZoom(false)} : null} >
      <RxCross1 className="rxCross1" onClick={() => { setShowModal(false); setShowLeftCaret(true); setShowRightCaret(true); switchGalleryBack(); }} />
      {showLeftCaretExpanded || zoom ? <RxCaretLeft className="caret__left_expanded" onClick={() => { caretLeft(); }} /> : null}
      {showRightCaretExpanded || zoom ? <RxCaretRight className="caret__right_expanded" onClick={() => { caretRight(); }} /> : null}
      <div style={zoom ? {'display': 'none'} : null}>
         <img className="img__expandedview" src={largeImage} onClick={() => {setZoom(true) }} style={{cursor: 'crosshair'}} />
      </div>
    </div>
  );
}

export default ExpandedView;
