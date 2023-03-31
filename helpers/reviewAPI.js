/* eslint-disable no-console */
require('dotenv').config();
const axios = require('axios');

const postReview = (req, res) => {
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews';

  console.log(req.body)
  axios.post(url, req.body, {
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
    data: req.body,
  })
    .then((success) => {
      res.status(201).send(success.data);
    })
    .catch((err) => {
      console.log('error posting review in server');
      console.log('err.response.data: ', err.response.data); // logs the error message
      console.log('err.response.status: ', err.response.status); // logs the error status code
      res.send(err);
    });
};

const helpfulReview = (reviewId) => {
  const options = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewId}/helpful`,
    // params: { reviewId },
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
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

// const postAnswer = (req, res) => {
//   const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.query.questionId}/answers`;
//   const options = {
//     method: 'post',
//     url,
//     headers: {
//       Authorization: `${process.env.TOKEN}`,
//     },
//     data: req.body,
//   };

//   axios(options)
//     .then((created) => {
//       res.send(created.data);
//     })
//     .catch((err) => {
//       console.log(`error posting answer to question ${req.query.questionId}`, err);
//       res.send(err);
//     });
// };

module.exports.postReview = postReview;
module.exports.helpfulReview = helpfulReview;
