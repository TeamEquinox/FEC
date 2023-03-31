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
    .then((data) => {
      console.log('return from posting review', data);
    })
    .catch((err) => {
      console.log('error posting new review', err);
    });
};

const postHelpfulReview = (reviewId) => {
  const options = {
    method: 'post',
    url: `/reviews/${reviewId}/helpful`,
    params: { reviewId },
  };

  return axios(options)
    .then((data) => {
      console.log('return from posting helpfulReview');
    })
    .catch((err) => {
      // console.log('error posting helpfulReview', err.response);
      // console.log('error posting helpfulReview from userRequests');
      console.log('error posting helpfulReview from userRequests', options);
    });
};

// const reportReview = (answerData, questionId) => {
//   const options = {
//     method: 'post',
//     url: '',
//     data: answerData,
//     params: { questionId },
//   };

//   return axios(options)
//     .then((data) => {
//       console.log('return from posting reportReview', data);
//     })
//     .catch((err) => {
//       console.log('error posting reportReview', err);
//     });
// };

module.exports = {
  postHelpfulReview,
  postReview,
  // reportReview,
};
