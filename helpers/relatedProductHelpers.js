
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

let configRatings = (obj) => {
  var oneStar = Number(obj['1']);
  var twoStar = Number(obj['2']);
  var threeStar = Number(obj['3']);
  var fourStar = Number(obj['4']);
  var fiveStar = Number(obj['5']);
  var actualRating = ((oneStar * 1) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4) + (fiveStar * 5));
  var totalPossibleRating = ((oneStar + twoStar + threeStar + fourStar + fiveStar) * 5);
  var result = Math.round((actualRating/totalPossibleRating * 5) * 10) / 10;
  return result;
}

let convertToObj = (arr) => {
  var result = {};
  arr.forEach((obj) => {
    result[obj.feature] = obj.value;
  })
  return result;
}

let modal = (currentProduct, relatedProduct) => {
  var result = [
    [currentProduct.name, 'Name', relatedProduct.name],
    [currentProduct.category, 'Category', relatedProduct.category],
    [currentProduct.description, 'Description', relatedProduct.description],
  ];
  var currentProductFeatures = currentProduct.features;
  var relatedProductFeatures = relatedProduct.features;
  var featureWithMoreItems = currentProductFeatures;
  var usingCurrentProductFeature = true;
  // if (relatedProductFeatures.length > currentProductFeatures.length) {
  //   featureWithMoreItems = relatedProductFeatures;
  //   usingCurrentProductFeature = false;
  // }
  // for (var i = 0; i < featureWithMoreItems.length; i++) {
  //   var feature = featureWithMoreItems[i]feature;
  //   var value = featureWithMoreItems[i].value;
  //   var secondFeature;
  //   var secondValue;
  //   if (usingCurrentProductFeature) {
  //     secondFeature = relatedProductFeatures[i].feature;
  //     secondValue = relatedProductFeatures[i].value;
  //   } else {
  //     secondFeature = currentProductFeatures[i].feature;
  //     secondValue = currentProductFeatures[i].value;
  //   }

  // }
}
//export helper function ====================
module.exports.relatedProducts = relatedProducts;
module.exports.relatedProductInfo = relatedProductInfo;
module.exports.modal = modal;
// module.exports.configRatings = configRatings;