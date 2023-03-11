import React, { useState, useEffect } from 'react';
const axios = require('axios');

import IndividualReview from './individualReview.jsx'
import NewReviews from './newReviews.jsx'

const ReviewList = () => {

  axios.get('/reviews')
    .then((response) => {
      console.log('success from axios.get in ReviewList: ', response)
    })
    .catch((err) => console.log('error from axios.get in ReviewList: ', err))

  return (
    <>
      <IndividualReview />
      <NewReviews />
      <div>This is from the ReviewList</div>
    </>
  )
}

export default ReviewList;