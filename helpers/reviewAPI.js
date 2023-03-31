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
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
  };

  return axios(options)
    .then(() => {
      console.log('return from posting helpfulReview');
    })
    .catch((err) => {
      console.log('error posting helpfulReview', err);
      console.log('error posting helpfulReview options: ', options);
    });
};

const reportReview = (reviewId) => {
  const options = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewId}/report`,
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
  };

  return axios(options)
    .then(() => {
      console.log('return from posting reportReview');
    })
    .catch((err) => {
      console.log('error posting reportReview', err);
      console.log('error posting reportReview options: ', options);
    });
};

module.exports.postReview = postReview;
module.exports.helpfulReview = helpfulReview;
module.exports.reportReview = reportReview;
