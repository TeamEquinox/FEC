require('dotenv').config();
const axios = require('axios');
// const config = require('../MLconfig.js')

let getProducts = () => {
  let options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products',
    headers: {
      'Authorization': `${process.env.TOKEN}`
    }
  }
  let axiosRequest = axios(options);

  let axiosPromise = axiosRequest
    .then((response) =>
      // console.log(response.data)
      response.data
    )
  return axiosPromise;
}

module.exports.getProducts = getProducts;