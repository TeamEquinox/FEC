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

let getRelatedProducts = (productId) => {
  let options = {
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/related`,
    headers: {
      'Authorization': `${process.env.TOKEN}`
    },
    params: {
      product_id: productId
    }
  }
  return axios(options)
    .then((data) => {
      // console.log('inside getRelatedProduct success call ', data.data);
      return data.data;
    })
    .catch((err) => {
      return err;
    })
}


let getMetaReviewData = () => {
  let options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta',
    headers: {
      'Authorization': `${process.env.TOKEN}`
    }
  }
  return axios.get(options)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    })
}

module.exports.getProducts = getProducts;
module.exports.getProductsById = getProductsById;
module.exports.getProductsByStyle = getProductsByStyle;
module.exports.getRelatedProducts = getRelatedProducts;
module.exports.getMetaReviewData = getMetaReviewData;