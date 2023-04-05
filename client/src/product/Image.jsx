import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import {
  RxCaretLeft, RxCaretRight, RxCaretUp, RxCaretDown,
} from 'react-icons/rx';
import ExpandedView from './ExpandedView.jsx';

function Image({
  photos, gallery, largeImage, setLargeImage, setOriginalGallery, originalGallery, setZoom, zoom, showModal, setShowModal,
}) {
  const [showLeftCaret, setShowLeftCaret] = useState(true);
  const [showRightCaret, setShowRightCaret] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const checkSmallImage = (photo) => {
    // console.log('photo HERE', photo)
    const imgArray = document.getElementsByClassName('img__id');
    // console.log('img HERE', imgArray);
    for (let i = 0; i < imgArray.length; i++) {
      // console.log('iiiii', imgArray[i].id)
      // console.log('id', imgArray[i].className);
      if (imgArray[i].className === 'img__id img__gallery_small3') {
        if (imgArray[i].id.slice(0, 60) !== photo) {
          document.getElementsByClassName('img__id')[i].className = 'img__id img__gallery_small4';
        } else {
          // console.log('does this ever run?')
          document.getElementsByClassName('img__id')[i].className = 'img__id img__gallery_small4';
          // console.log('id', imgArray[i].className);
        }
      }
      if (imgArray[i].id.slice(0, 60) !== photo) {
        document.getElementsByClassName('img__id')[i].className = 'img__id img__gallery_small';
      } else {
        document.getElementsByClassName('img__id')[i].className = 'img__id img__gallery_small2';
      }
    }
  };

  const switchGallery = () => {
    const imgArray = document.getElementsByClassName('img__id');
    for (let i = 0; i < imgArray.length; i++) {
      document.getElementsByClassName('img__id')[i].className = 'img__id img__gallery_small3';
    }
  };

  useEffect(() => {
    setOriginalGallery(gallery.slice(galleryIndex, galleryIndex + 7));
  }, [galleryIndex]);
  useEffect(() => {
    if (largeImage === photos[0].photos[0].url) {
      setShowLeftCaret(false);
    }
    checkSmallImage(photos[0].photos[0].url.slice(0, 60));
    // console.log('fotos r here', photos[0].photos[0].url)
  }, [gallery]);

  useEffect(() => {
    if (photos.length === 1) {
      setShowLeftCaret(false);
      setShowRightCaret(false);
    }
    if (gallery.length === 1) {
      setShowRightCaret(false);
      setShowLeftCaret(false);
    }
    if (gallery.length >= 2) {
      setShowLeftCaret(false);
      setShowRightCaret(true);
    }
  }, [gallery]);

  let nextIndex;
  let nextPhoto;

  const caretRight = () => {
    if (!originalGallery.length) {
      if (photos[0].photos) {
        if (showLeftCaret === false) {
          setShowLeftCaret(true);
        }
        photos[0].photos.forEach((photo, index) => {
          if (photo.url.slice(0, 60) === largeImage.slice(0, 60)) {
            if (index === photos[0].photos.length - 2) {
              setShowRightCaret(!showRightCaret);
            }
            nextIndex = index + 1;
            nextPhoto = photos[0].photos[nextIndex].url;
            setLargeImage(photos[0].photos[nextIndex].url);
          }
        });
      }
    } else if (originalGallery.length > 0) {
      if (showLeftCaret === false) {
        setShowLeftCaret(true);
      }
      originalGallery.forEach((photo, index) => {
        if (photo.url.slice(0, 60) === largeImage.slice(0, 60)) {
          if (index === originalGallery.length - 2) {
            setShowRightCaret(false);
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
        if (showRightCaret === false) {
          setShowRightCaret(true);
        }
        photos[0].photos.forEach((photo, index) => {
          if (photo.url.slice(0, 60) === largeImage.slice(0, 60)) {
            if (index === 1) {
              setShowLeftCaret(!showLeftCaret);
            }
            nextIndex = index - 1;
            nextPhoto = photos[0].photos[nextIndex].url;
            setLargeImage(photos[0].photos[nextIndex].url);
          }
        });
      }
    } else if (gallery.length > 1) {
      if (showRightCaret === false) {
        setShowRightCaret(true);
      }
      originalGallery.forEach((photo, index) => {
        if (photo.url.slice(0, 60) === largeImage.slice(0, 60)) {
          console.log('arge', largeImage);
          console.log('url', photo.url);
          if (index === 1) {
            setShowLeftCaret(!showLeftCaret);
          }
          nextIndex = index - 1;
          nextPhoto = gallery[nextIndex].url;
          setLargeImage(gallery[nextIndex].url);
          console.log('large image is set');
        }
      });
    }
  };

  const reSize = () => {
    const img = document.getElementById('img__gallery').width;
    console.log('img', img);
  };

  const caretUp = () => {
    if (originalGallery.length >= 7) {
      setGalleryIndex(galleryIndex + 1);
    }
  };

  const caretDown = () => {
    setGalleryIndex(galleryIndex - 1);
  };

  return (
    <div className="div__image_container">
      {showLeftCaret ? <RxCaretLeft className="caret__left" onClick={() => { caretLeft(); }} /> : null}
      {showRightCaret ? <RxCaretRight className="caret__right" onClick={() => { caretRight(); }} /> : null}
      { showModal ? null : <div className="div__large_image"><img id="img__gallery" src={largeImage} onClick={() => { setShowModal(true); setShowLeftCaret(false); setShowRightCaret(false); reSize(); }} /></div> }
      {showModal ? switchGallery() : null}
      {showModal ? <ExpandedView setShowModal={setShowModal} largeImage={largeImage} zoom={zoom} setZoom={setZoom} originalGallery={originalGallery} setLargeImage={setLargeImage} setShowLeftCaret={setShowLeftCaret} setShowRightCaret={setShowRightCaret}/> : null}
      <div className="div__img_gallery_small">
        <RxCaretUp className="caret__up" onClick={(e) => { e.preventDefault(); caretUp(); }} />
        {originalGallery.slice(0, 7).map((photo) => (
          <img className="img__id img__gallery_small" id={photo.thumbnail_url} src={photo.thumbnail_url} onClick={(e) => { e.preventDefault(); setLargeImage(photo.thumbnail_url.slice(0, 60)); checkSmallImage(photo.thumbnail_url.slice(0, 60)); }} key={photo.thumbnail_url} alt="small vertical gallery"/>
        ))}
        <RxCaretDown className="caret__down" onClick={() => { caretDown(); }} />
      </div>
    </div>
  );
}

export default Image;
