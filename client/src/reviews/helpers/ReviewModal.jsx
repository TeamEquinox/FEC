/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import {
  ref, uploadBytes, listAll, getDownloadURL,
} from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from './firebase';
import DropdownSelector from './DropSelectors';

function ReviewModal(props) {
  const {
    show,
    handleClose,
    handleSubmit,
    handleInputChange,
    formData,
    tempCharStorage,
    imageUpload,
    setImageUpload,
  } = props;
  const [rating, setRating] = useState(0);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, 'images/');
  const showHideClassName = show
    ? 'modal review-display-block'
    : 'modal review-display-none';

  const handleClick = (newRating) => {
    setRating(newRating);
    handleInputChange({ target: { name: 'rating', value: newRating } });
  };

  const renderStar = (index) => {
    if (index < rating) {
      return (
        <FontAwesomeIcon
          icon={solidStar}
          onClick={() => handleClick(index + 1)}
          key={index}
          style={{ fontSize: '30px' }}
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={regularStar}
        onClick={() => handleClick(index + 1)}
        key={index}
        style={{ fontSize: '30px' }}
      />
    );
  };

  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        listAll(imageListRef).then((response) => {
          const urlPromises = response.items.map(getDownloadURL);
          Promise.all(urlPromises).then((urls) => {
            setImageList((prev) => [...prev, ...urls]);
            const lastImageUrl = urls[urls.length - 1];
            formData.photos = [lastImageUrl];
          });
        });
      })
      .catch((err) => {
        console.log('Error uploading image: ', err);
      });
  };

  return (
    <div className={showHideClassName}>
      <section className="review-modal-main">
        <form onSubmit={handleSubmit}>
          <h2 style={{ marginTop: '0px', marginBottom: '0px' }}>
            Review for the
            {' '}
            {tempCharStorage.Name}
            !
          </h2>
          <label htmlFor="rating">Rating: </label>
          <div>{[5, 4, 3, 2, 1].map((_, index) => renderStar(index))}</div>

          <label htmlFor="summary">Summary: </label>
          <input
            type="text"
            id="summary"
            name="summary"
            maxLength="60"
            required
            value={formData.summary}
            onChange={handleInputChange}
          />
          <br />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="review-modal-body">Review: </label>
            <textarea
              id="body"
              name="body"
              rows="5"
              cols="40"
              required
              value={formData.body}
              onChange={handleInputChange}
              style={{ resize: 'none', overflow: 'auto' }}
            />
          </div>

          <label htmlFor="recommend">Would you recommend this product? </label>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label>
              <input
                type="radio"
                name="recommend"
                id="recommend-yes"
                value="true"
                checked={!!formData.recommend}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="recommend"
                id="recommend-no"
                value="false"
                checked={!!formData.recommend}
                onChange={handleInputChange}
              />
              No
            </label>
          </div>

          <div>
            <input
              type="file"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            />
            <button type="submit" onClick={uploadImage}>
              Upload Images
            </button>
          </div>

          <label htmlFor="name">Username: </label>
          <input
            type="text"
            id="name"
            name="name"
            maxLength="60"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
          <br />

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            maxLength="60"
            required
            value={formData.email}
            onChange={handleInputChange}
          />

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {tempCharStorage.Fit && (
              <>
                <label style={{ flex: 1 }}>Fit:</label>
                <DropdownSelector
                  element="Fit"
                  formData={formData}
                  tempCharStorage={tempCharStorage}
                  handleInputChange={(e) => handleInputChange(e, tempCharStorage.Fit)}
                  style={{ flex: 1 }}
                />
              </>
            )}
            {tempCharStorage.Length && (
              <>
                <span style={{ marginLeft: '10px', marginRight: '10px' }}>
                  |
                </span>
                <label style={{ flex: 1 }}>Length:</label>
                <DropdownSelector
                  element="Length"
                  formData={formData}
                  tempCharStorage={tempCharStorage}
                  handleInputChange={(e) => handleInputChange(e, tempCharStorage.Length)}
                  style={{ flex: 1 }}
                />
              </>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {tempCharStorage.Quality && (
              <>
                <label style={{ flex: 1 }}>Quality:</label>
                <DropdownSelector
                  element="Quality"
                  formData={formData}
                  tempCharStorage={tempCharStorage}
                  handleInputChange={(e) => handleInputChange(e, tempCharStorage.Quality)}
                  style={{ flex: 1 }}
                />
              </>
            )}
            {tempCharStorage.Comfort && (
              <>
                <span style={{ marginLeft: '10px', marginRight: '10px' }}>
                  |
                </span>
                <label style={{ flex: 1 }}>Comfort:</label>
                <DropdownSelector
                  element="Comfort"
                  formData={formData}
                  tempCharStorage={tempCharStorage}
                  handleInputChange={(e) => handleInputChange(e, tempCharStorage.Comfort)}
                  style={{ flex: 1 }}
                />
              </>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {tempCharStorage.Width && (
              <>
                <label style={{ flex: 1 }}>Width:</label>
                <DropdownSelector
                  element="Width"
                  formData={formData}
                  tempCharStorage={tempCharStorage}
                  handleInputChange={(e) => handleInputChange(e, tempCharStorage.Width)}
                  style={{ flex: 1 }}
                />
              </>
            )}
            {tempCharStorage.Size && (
              <>
                <span style={{ marginLeft: '10px', marginRight: '10px' }}>
                  |
                </span>
                <label style={{ flex: 1 }}>Size:</label>
                <DropdownSelector
                  element="Size"
                  formData={formData}
                  tempCharStorage={tempCharStorage}
                  handleInputChange={(e) => handleInputChange(e, tempCharStorage.Size)}
                  style={{ flex: 1 }}
                />
              </>
            )}
          </div>

          <button type="submit" className="submit-review-modal">
            Submit Review
          </button>
          <span style={{ marginLeft: '10px', marginRight: '10px' }}>|</span>
          <button
            type="button"
            onClick={handleClose}
            className="close-review-modal"
          >
            Close
          </button>
        </form>
      </section>
    </div>
  );
}

export default ReviewModal;
