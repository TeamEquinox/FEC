import React, { useState, useEffect } from 'react';
const axios = require('axios');

import NewReviews from './newReviews.jsx'

const ReviewList = ({ product }) => {

  return (
    <>
      <NewReviews />
      <div>This is from the ReviewList</div>
    </>
  )
}

export default ReviewList;