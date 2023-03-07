import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import IndividualReview from './individualReview.jsx'
import NewReviews from './newReviews.jsx'

const ReviewList = () => {

  return (
    <>
      <IndividualReview />
      <NewReviews />
      <div>This is from the ReviewList</div>
    </>
  )
}

export default ReviewList;