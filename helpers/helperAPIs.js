require('dotenv').config();
const axios = require('axios');
// const config = require('../MLconfig.js')

let getProducts = () => {
  let options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products',
    headers: {
      'Authorization': `${process.env.TOKEN}`
    },
    params: {
      page: 1,
      count: 1
    }
  }
  let axiosRequest = axios(options);

  let axiosPromise = axiosRequest
    .then((response) =>
      // console.log(response.data)
      response.data
    )
    .catch(err => {
      console.log('error', err)
    })
  return axiosPromise;
}

let getProductsById = (productId) => {
  let options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}`,
    headers: {
      'Authorization': `${process.env.TOKEN}`
    },
    params: {
      product_id: productId
    }
  }
  let axiosRequest = axios(options);

  let axiosPromise = axiosRequest
    .then((response) =>
      response.data
    )
    .catch(err => {
      console.log('error', err)
    })
  return axiosPromise;
}

let getProductsByStyle = (productId) => {
  let options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles`,
    headers: {
      'Authorization': `${process.env.TOKEN}`
    },
    params: {
      product_id: productId
    }
  }
  let axiosRequest = axios(options);

  let axiosPromise = axiosRequest
    .then((response) =>
      response.data
    )
    .catch(err => {
      console.log('error', err)
    })
  return axiosPromise;
}

module.exports.getProducts = getProducts;
module.exports.getProductsById = getProductsById;
module.exports.getProductsByStyle = getProductsByStyle;