
const productAPI = require('./helperAPIs.js');

//helper==============================
let findDefault = (arr) => {
  var result = {};
  var hasPhotos = {};
  var count = 0;
  arr.forEach((style) => {
    if (style['default?']) {
      result = style;
    }
    // if (style.photos[0].url !== null && count === 0) {
    //   hasPhotos = style;
    //   count++;
    // }
  })
  if (Object.keys(result).length === 0 ) {
    // result = hasPhotos;
    result = arr[0];
  }
  return result;
}



//get related products==================
let relatedProducts = (id) => {
  return productAPI.getRelatedProducts(id)
  .then((data) => {
    return data;
  })
  .catch ((err) => err);
}

//get related products info=============
let relatedProductInfo = (related) => {

  var resultArr = [];
  related.forEach((id) => {
    var first = productAPI.getProductsById(id);
    var second = productAPI.getProductsByStyle(id);
    var third = productAPI.getMetaReviewData(id);
    resultArr.push(first);
    resultArr.push(second);
    resultArr.push(third);
  })

  return Promise.all(resultArr)
  .then((data) => {
    var result = [];
    for (var i = 0; i < data.length; i+=3) {
      var one = data[i];
      var two = data[i + 1];
      var three = data[i + 2];
      var obj = {};

      obj.id = one.id;
      obj.name = one.name;
      obj.category = one.category;

      var defaults = findDefault(two.results);
      obj['original_price'] = defaults['original_price'];
      if (!defaults['sales_price']) {
        obj['sales_price'] = 'N/A';
      } else {
        obj['sales_price'] = defaults['sales_price'];
      }
      if (defaults.photos[0].url === null) {
        obj.photo = 'N/A';
      } else {
        obj.photo = defaults.photos[1].url;
      }

      obj.rating = three.ratings;   
      result.push(obj);   
    }
    return result;
  })
  .catch((err) => err);
}

//expot helper function ====================
module.exports.relatedProducts = relatedProducts;
module.exports.relatedProductInfo = relatedProductInfo;