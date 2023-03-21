
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
    if (style.photos[0].url !== null && count === 0) {
      hasPhotos = style;
      count++;
    }
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
    // console.log('DATA inside relatedProductsInfo', data)
    var result = [];
    var check = {};
    for (var i = 0; i < data.length; i+=3) {
      // console.log('Features', data[i].features)
      var one = data[i];
      var two = data[i + 1];
      var three = data[i + 2];
      var obj = {};
      obj.id = one.id;
      if (!check[one.id]) {
        check[one.id] = one.id;
        obj.name = one.name;
        obj.category = one.category;
        obj['original_price'] = two.results[0].original_price;
        obj['sale_price'] = two.results[0].sale_price;
        if (two.results[0].sale_price === null) {
          obj['sale_price'] = 'N/A';
        } 
        // console.log('DATA[i]====> ', two)
        
        
        
        // console.log('OBJ====>2 ', two.results[0].photos[0].url)
        obj.photo = two.results[0].photos[0].url;
        if (obj.photo === null) {
          obj.photo = 'N/A';
        } 
        obj.rating = three.ratings;   
        // console.log('OBJ====> ',  obj);
        result.push(obj);   
      }
    }
    // console.log('results======>', result)
    return result;
  })
  .catch((err) => err);
}


let UpdateDetailsList = (id) => {
  let first = productAPI.getProductsById(id);
  let second = productAPI.getProductsByStyle(id);
  let third = productAPI.getReviews(id);
  let four = productAPI.getMetaReviewData(id);
  let result = [first, second, third, four];
  return Promise.all(result)
  .then((data) => {
    return data;
  })
  .catch((err) => err);
}

//export helper function ====================
module.exports.relatedProducts = relatedProducts;
module.exports.relatedProductInfo = relatedProductInfo;
module.exports.UpdateDetailsList = UpdateDetailsList;