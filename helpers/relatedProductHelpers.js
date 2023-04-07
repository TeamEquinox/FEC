const productAPI = require('./helperAPIs');

const relatedProducts = (id) => productAPI.getRelatedProducts(id)
  .then((data) => data)
  .catch((err) => err);

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
      const result = [];
      const check = {};
      for (let i = 0; i < data.length; i += 3) {
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

          obj.photo = two.results[0].photos[0].url;
          if (obj.photo === null) {
            obj.photo = 'N/A';
          }
          obj.rating = three.ratings;
          result.push(obj);
        }
      }
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

module.exports.relatedProducts = relatedProducts;
module.exports.relatedProductInfo = relatedProductInfo;
module.exports.UpdateDetailsList = UpdateDetailsList;
module.exports.CompareDetailsList = CompareDetailsList;
