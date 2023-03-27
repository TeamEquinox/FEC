import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import {
  RxCaretLeft, RxCaretRight, RxCaretUp, RxCaretDown, RxDividerHorizontal,
} from 'react-icons/Rx';
import ExpandedView from './ExpandedView.jsx';

function Image({
  photos, gallery, largeImage, setLargeImage, setGallery,
}) {
  console.log('galleryHERE', gallery);

  const [showLeftCaret, setShowLeftCaret] = useState(true);
  const [showRightCaret, setShowRightCaret] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showBar, setShowBar] = useState(false);

  let originalGallery;

  useEffect(() => {
    if (largeImage === photos[0].photos[0].url) {
      setShowLeftCaret(false);
    }
    originalGallery = gallery;
    console.log('og', originalGallery)
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
    if (!gallery.length) {
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
    } else if (gallery.length > 0) {
      if (showLeftCaret === false) {
        setShowLeftCaret(true);
      }
      gallery.forEach((photo, index) => {
        if (photo.url.slice(0, 60) === largeImage.slice(0, 60)) {
          if (index === gallery.length - 2) {
            setShowRightCaret(false);
          }
          nextIndex = index + 1;
          nextPhoto = gallery[nextIndex].url;
          setLargeImage(gallery[nextIndex].url);
          console.log('large image is set');
        }
      });
    }
  };

  const caretLeft = () => {
    if (!gallery.length) {
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
      gallery.forEach((photo, index) => {
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
  // console.log('galleryHERE', gallery)

  const caretUp = () => {
    console.log('gal from here', gallery);
    if (gallery.length > 7 && gallery.length !== 0) {
      const copyGallery = gallery.slice();
      setGallery(copyGallery.slice(1, 8));
      //create new state for new array
    }
  };

  const caretDown = () => {
console.log('ggggg', originalGallery)
  };

  return (
    <div className="div__image_container">
      {showLeftCaret ? <RxCaretLeft className="caret__left" onClick={() => { caretLeft(); }} /> : null}
      {showRightCaret ? <RxCaretRight className="caret__right" onClick={() => { caretRight(); }} /> : null}
      <div className="div__large_image"><img id="img__gallery" src={largeImage} onClick={() => { setShowModal(true); reSize(); }} /></div>
      {showModal ? <ExpandedView setShowModal={setShowModal} largeImage={largeImage} /> : null}
      <div className="div__img_gallery_small">

        <RxCaretUp className="caret__up" onClick={() => { caretUp(); }} />
        {gallery.slice(0, 7).map((photo) => (
          <>
            {showBar ? <RxDividerHorizontal className="divider_horizontal" /> : null}
            <img className="img__gallery_small" src={photo.thumbnail_url} onClick={(e) => { e.preventDefault(); setLargeImage(photo.thumbnail_url.slice(0, 60)); }} key={photo.thumbnail_url} />

          </>

        ))}
        <RxCaretDown className="caret__down" onClick={() => { caretDown(); }} />

      </div>
    </div>
  );

  // return (

  //   <div className="div__image_container">
  //     {showLeftCaret ? <RxCaretLeft className="caret__left" onClick={() => { caretLeft(); }} /> : null}
  //     {showRightCaret ? <RxCaretRight className="caret__right" onClick={() => { caretRight(); }} /> : null}
  //     <div className="div__large_image">

  //       <img id="img__gallery" src={largeImage || photos[0].photos[0].url} onClick={() => { console.log('clicked'); setShowModal(true); reSize();checkStyle() }} />
  //       {showModal ? <ExpandedView classname="expandedview" setShowModal={setShowModal} largeImage={largeImage} /> : null}
  //     </div>

  //     <div className="div__img_gallery_small">

  //       <RxCaretUp className="caret__up" />

  //       {photos[0].photos ? photos[0].photos.slice(0,7).map((photo) => (
  //         <>
  //               {showBar ? <RxDividerHorizontal className="divider_horizontal" /> : null}
  //           <img className="img__gallery_small" src={photo.thumbnail_url} onClick={(e) => { e.preventDefault(); setLargeImage(photo.thumbnail_url.slice(0, 60))}} key={photo.thumbnail_url} />

  //         </>

  //       )) : null}
  //       <RxCaretDown className="caret__down" />
  //     </div>
  //   </div>

  // );
}

export default Image;
