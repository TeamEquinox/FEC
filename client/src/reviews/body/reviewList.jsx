import React, { useState, useEffect } from 'react';
const axios = require('axios');

import IndividualReview from './individualReview.jsx'
import NewReviews from './newReviews.jsx'

const ReviewList = ({ product }) => {

  return (
    <>
      <IndividualReview reviews={product[2]}/>
      <NewReviews />
      <div>This is from the ReviewList</div>
    </>
  )
}

export default ReviewList;