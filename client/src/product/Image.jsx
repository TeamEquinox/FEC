import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import {
  RxCaretLeft, RxCaretRight, RxCaretUp, RxCaretDown, RxDividerHorizontal,
} from 'react-icons/Rx';
import ExpandedView from './ExpandedView.jsx';

function Image({
  photos, gallery, largeImage, setLargeImage, setOriginalGallery, originalGallery
}) {


  const [showLeftCaret, setShowLeftCaret] = useState(true);
  const [showRightCaret, setShowRightCaret] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showBar, setShowBar] = useState(false);
  // const [originalGallery, setOriginalGallery] = useState(gallery.slice(0,7));
  const [galleryIndex, setGalleryIndex] = useState(0);
  // console.log('galleryHERE', gallery);
  // console.log('ogee', originalGallery)
  useEffect(() => {
    // console.log('clicked is', clicked);
    setOriginalGallery(gallery.slice(galleryIndex, galleryIndex + 7));
    // console.log('when this runs', originalGallery);
    // console.log('product is', product)
  }, [galleryIndex]);
// console.log('afterrrrr', originalGallery)
  useEffect(() => {
    if (largeImage === photos[0].photos[0].url) {
      setShowLeftCaret(false);
    }
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

  const checkSmallImage = (photo) => {
    let imgArray = document.getElementsByClassName(`img__gallery_small`);
    console.log('img HERE', imgArray )
    for (var i = 0; i < imgArray.length; i ++) {
      console.log('iiiii', imgArray[i])
      if (imgArray[i].id !== photo) {
        document.getElementsByClassName('img__gallery_small')[i].className = "img__gallery_small";
      } else {
        document.getElementsByClassName('img__gallery_small')[i].className = "img__gallery_small2";

      }

    }

  }



  return (
    <div className="div__image_container">
      {showLeftCaret ? <RxCaretLeft className="caret__left" onClick={() => { caretLeft(); }} /> : null}
      {showRightCaret ? <RxCaretRight className="caret__right" onClick={() => { caretRight(); }} /> : null}
      <div className="div__large_image"><img id="img__gallery" src={largeImage} onClick={() => { setShowModal(true); reSize(); }} /></div>
      {showModal ? <ExpandedView setShowModal={setShowModal} largeImage={largeImage} /> : null}
      <div className="div__img_gallery_small">

        <RxCaretUp className="caret__up" onClick={(e) => { e.preventDefault(); caretUp()}} />
        {originalGallery.slice(0,7).map((photo) => (
          <>
            <img className="img__gallery_small" id={`${photo.thumbnail_url}`} src={photo.thumbnail_url} onClick={(e) => { e.preventDefault(); setLargeImage(photo.thumbnail_url.slice(0, 60)); checkSmallImage(photo.thumbnail_url) }} key={photo.thumbnail_url} />

            {showBar ? <RxDividerHorizontal className="divider_horizontal" /> : null}
          </>
        ))}
        <RxCaretDown className="caret__down" onClick={() => { caretDown(); }} />

      </div>
    </div>
  );
}

export default Image;
