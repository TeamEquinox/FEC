const productAPI = require('./helperAPIs');

//  helper==============================

// const findDefault = (arr) => {
//   let result = {};
//   let hasPhotos = {};
//   let count = 0;
//   arr.forEach((style) => {
//     if (style['default?']) {
//       result = style;
//     }
//     if (style.photos[0].url !== null && count === 0) {
//       hasPhotos = style;
//       count++;
//     }
//   });
//   if (Object.keys(result).length === 0) {
//     // result = hasPhotos;
//     result = arr[0];
//   }
//   return result;
// };

// get related products==================
const relatedProducts = (id) => productAPI.getRelatedProducts(id)
  .then((data) => data)
  .catch((err) => err);

// get related products info=============
const relatedProductInfo = (related) => {
  const resultArr = [];
  related.forEach((id) => {
    const first = productAPI.getProductsById(id);
    const second = productAPI.getProductsByStyle(id);
    const third = productAPI.getMetaReviewData(id);
    resultArr.push(first);
    resultArr.push(second);
    resultArr.push(third);
  });

  return Promise.all(resultArr)
    .then((data) => {
    // console.log('DATA inside relatedProductsInfo', data)
      const result = [];
      const check = {};
      for (let i = 0; i < data.length; i += 3) {
      // console.log('Features', data[i].features)
        const one = data[i];
        const two = data[i + 1];
        const three = data[i + 2];
        const obj = {};
        obj.id = one.id;
        if (!check[one.id]) {
          check[one.id] = one.id;
          obj.name = one.name;
          obj.category = one.category;
          obj.original_price = two.results[0].original_price;
          obj.sale_price = two.results[0].sale_price;
          if (two.results[0].sale_price === null) {
            obj.sale_price = 'N/A';
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
};

const UpdateDetailsList = (id) => {
  const first = productAPI.getProductsById(id);
  const second = productAPI.getProductsByStyle(id);
  const third = productAPI.getReviews(id);
  const four = productAPI.getMetaReviewData(id);
  const result = [first, second, third, four];
  return Promise.all(result)
    .then((data) => data)
    .catch((err) => err);
};

const CompareDetailsList = (id) => {
  const first = productAPI.getProductsById(id);
  const second = productAPI.getMetaReviewData(id);
  const result = [first, second];
  return Promise.all(result)
    .then((data) => data)
    .catch((err) => err);
};

// export helper function ====================
module.exports.relatedProducts = relatedProducts;
module.exports.relatedProductInfo = relatedProductInfo;
module.exports.UpdateDetailsList = UpdateDetailsList;
module.exports.CompareDetailsList = CompareDetailsList;
