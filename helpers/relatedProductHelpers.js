
const productAPI = require('./helperAPIs.js');

let relatedProducts = (id) => {
  return productAPI.getRelatedProducts(id)
  .then((data) => {
    // console.log('inside relatedProductHelpers related product function', data);
    return data;
  })
  .catch ((err) => err);
}

let relatedProductInfo = (related) => {

  var productInfo = {};

  related.forEach((id) => {
    var arr = [];
    arr.push(getCategoryAndName(id));
    arr.push(getImagesAndPrice(id));
    arr.push(getRatings());
    let allData = Promise.all(arr);
    // console.
  })
}

module.exports.relatedProducts = relatedProducts;
module.exports.relatedProductInfo = relatedProductInfo;