import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RxCheck } from 'react-icons/rx';
import StarRating from '../starRatings.jsx';
import Image from './Image';
import Style from './Style';
import Cart from './Cart.jsx';

function ProductOverview({ product, setOutfit }) {
  // console.table('productOnLoad', product);

  const [gallery, setGallery] = useState(product[1].results[0].photos);
  const [originalGallery, setOriginalGallery] = useState(gallery.slice(0, 7));
  const [largeImage, setLargeImage] = useState(product[1].results[0].photos[0].url);
  const [reviews, setReviews] = useState(0);
  const [cart, setCart] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLargeImage(product[1].results[0].photos[0].url);
    setGallery(product[1].results[0].photos);
    setOriginalGallery(product[1].results[0].photos);
  }, [product]);

  useEffect(() => {
    if (largeImage.length !== 0 && document.getElementById(`check-${largeImage}`) !== null) {
      document.getElementById(`check-${largeImage}`).classList.remove('check_circled');
      document.getElementById(`check-${largeImage}`).classList.add('check_circled2');
    }
  }, [largeImage]);

  let counter = 0;
  useEffect(() => {
    const numReviews = Object.values(product[3].ratings);
    numReviews.forEach((review) => {
      counter += Number(review);
    });
    setReviews(counter);
  }, [product]);

  const configRatings = (obj) => {
    const oneStar = Number(obj['1']);
    const twoStar = Number(obj['2']);
    const threeStar = Number(obj['3']);
    const fourStar = Number(obj['4']);
    const fiveStar = Number(obj['5']);
    const actualRating = ((oneStar * 1) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4) + (fiveStar * 5));
    const totalPossibleRating = ((oneStar + twoStar + threeStar + fourStar + fiveStar) * 5);
    const result = Math.round((actualRating / totalPossibleRating * 5) * 10) / 10;
    return result;
  };

  return (
    <section className="section__product">
      <FontAwesomeIcon icon={faCartShopping} className="shoppingCart" onClick={() => { setCart(true); }} />
      {cart ? <Cart setCart={setCart} /> : null}
      {showModal ? null : (
        <div className="div__product">
          <div className="div__reviews" onClick={() => { window.location.replace('/#overall-rating'); }}>
            <u>
              Read all{' '}
              {reviews}
              {' '}
              reviews
            </u>
          </div>
          <div className="div__starRating"><StarRating rating={configRatings(product[3].ratings)} pixels={20} topMargin={-25} /></div>

          <h3>{product.length ? product[0].category : 'Category'}</h3>
          <div className="div__product_name">{product.length ? product[0].name : 'Name'}</div>
          { showModal ? null : <Style styles={product.length ? product[1].results : null} setGallery={setGallery} setLargeImage={setLargeImage} largeImage={largeImage} product={product} setOriginalGallery={setOriginalGallery} originalGallery={originalGallery} /> }
        </div>
      )}
      <Image photos={product.length ? product[1].results : null} setLargeImage={setLargeImage} gallery={gallery} largeImage={largeImage} setGallery={setGallery} setOutfit={setOutfit} product={product} setOriginalGallery={setOriginalGallery} originalGallery={originalGallery} zoom={zoom} setZoom={setZoom} showModal={showModal} setShowModal={setShowModal} zoom={zoom} />
      { showModal ? null : (
        <div className="div__bottom_bar">
          <div className="div__slogan">{product[0].slogan}</div>
          <div className="div__description">{product.length ? product[0].description : 'Description'}</div>
          <div className="div__verticalLine" />
          <div className="div__feature">
            {product.length ? product[0].features.map((feature) => (
              <ul key={Math.floor(Math.random() * (1000 - 0 + 1) + 0)}>
                <RxCheck className="rxCheck" key={Math.floor(Math.random() * (1000 - 0 + 1) + 0)} />
                {feature.feature}
                :
                {' '}
                {feature.value}

              </ul>
            ))
              : null}
          </div>
        </div>
      )}
    </section>

  );
}

export default ProductOverview;
