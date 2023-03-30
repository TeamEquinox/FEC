/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
const axios = require('axios');

const postHelpfulReview = (reviewId) => {
  const options = {
    method: 'post',
    url: `/reviews/${reviewId}/helpful`,
    // params: { reviewId },
  };

  return axios(options)
    .then((data) => {
      console.log('return from posting helpfulReview', data);
    })
    .catch((err) => {
      console.log('error posting helpfulReview', err);
      console.log('error posting helpfulReview', options);
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
  // reportReview,
};
