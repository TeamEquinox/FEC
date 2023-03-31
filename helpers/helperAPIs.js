/* eslint-disable no-console */
require('dotenv').config();
const axios = require('axios');

const getProducts = () => {
  const options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products',
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
    params: {
      page: 1,
      count: 1,
    },
  };
  const axiosRequest = axios(options);

  const axiosPromise = axiosRequest
    .then((response) => response.data)
    .catch((err) => {
      console.log('error', err);
    });
  return axiosPromise;
};

const getProductsById = (productId) => {
  const options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}`,
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
    params: {
      product_id: productId,
    },
  };
  const axiosRequest = axios(options);

  const axiosPromise = axiosRequest
    .then((response) => response.data)
    .catch((err) => {
      console.log('error', err);
    });
  return axiosPromise;
};

const getProductsByStyle = (productId) => {
  const options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles`,
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
    params: {
      product_id: productId,
    },
  };
  const axiosRequest = axios(options);

  const axiosPromise = axiosRequest
    .then((response) => response.data)
    .catch((err) => {
      console.log('error', err);
    });
  return axiosPromise;
};

const getRelatedProducts = (productId) => {
  const options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/related`,
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
    params: {
      product_id: productId,
    },
  };
  return axios(options)
    .then((data) => data.data)
    .catch((err) => err);
};

const getMetaReviewData = (productId) => {
  const options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta',
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
    params: {
      product_id: productId,
    },
  };
  return axios(options)
    .then((data) => data.data)
    .catch((err) => err);
};

const getReviews = (productId) => {
  const options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews',
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
    params: {
      page: 1,
      count: 1000,
      sort: 'newest',
      product_id: productId,
    },
  };

  return axios(options)
    .then((response) => response.data)
    .catch((err) => {
      console.log(`error with ${productId}`, err);
    });
};

const helpfulReview = (reviewId) => {
  const options = {
    method: 'post',
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

const sendClickTrack = (req, res) => {
  const options = {
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions',
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
    data: req.body,
  };

  axios(options)
    .then(() => {
      res.send('success!');
    })
    .catch((err) => {
      console.log('error sending click data', err);
      res.send(err);
    });
};

module.exports.getProducts = getProducts;
module.exports.getProductsById = getProductsById;
module.exports.getProductsByStyle = getProductsByStyle;
module.exports.getRelatedProducts = getRelatedProducts;
module.exports.getMetaReviewData = getMetaReviewData;
module.exports.getReviews = getReviews;
module.exports.sendClickTrack = sendClickTrack;
module.exports.helpfulReview = helpfulReview;
