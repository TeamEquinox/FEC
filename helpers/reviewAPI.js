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

const postHelpfulReview = (req, res) => {
  // console.log('req.query: ', req.query);
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req}/helpful`;

  console.log('req.body: ', req.body)
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
      // console.log('err.response.data: ', err.response.data); // logs the error message
      console.log('err.response.status: ', err.response.status); // logs the error status code
      res.send(err);
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
module.exports.postHelpfulReview = postHelpfulReview;
