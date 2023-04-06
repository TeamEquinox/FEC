/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
const axios = require('axios');

const postReview = (reviewData) => {
  const options = {
    method: 'post',
    url: '/reviews',
    data: reviewData,
  };

  return axios(options)
    .then(() => {
      // console.log('return from posting review');
    })
    .catch((err) => {
      console.log('error posting new review', err);
    });
};

const putHelpfulReview = (reviewId) => {
  const options = {
    method: 'put',
    url: `/reviews/${reviewId}/helpful`,
    params: { reviewId },
  };

  return axios(options)
    .then(() => {
      // console.log('return from posting helpfulReview in userRequests');
    })
    .catch((err) => {
      console.log('error posting helpfulReview from userRequests', err);
    });
};

const putReportReview = (reviewId) => {
  const options = {
    method: 'put',
    url: `/reviews/${reviewId}/report`,
    params: { reviewId },
  };

  return axios(options)
    .then(() => {
      // console.log('return from posting putReportReview');
    })
    .catch((err) => {
      console.log('error posting putReportReview from userRequests', err);
    });
};

const getReviewsRefresher = (productId) => {
  return axios.get('/reviews', { params: { productId } })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log('error retrieving questions', err);
    });
};

module.exports = {
  putHelpfulReview,
  postReview,
  putReportReview,
  getReviewsRefresher,
};
