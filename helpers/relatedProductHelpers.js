

let relatedProducts = (id) => {
  // getRelatedProducts(id)
  // .then((data) => {
  //   return data;
  // })
  // .catch ((err) => err);
}

let relatedProductInfo = () => {

  var productInfo = {};

  relatedProducts.forEach((id) => {
    var arr = [];
    arr.push(getCategoryAndName(id));
    arr.push(getImagesAndPrice(id));
    arr.push(getRatings());
    let allData = Promise.all(arr);
    console.
  })
}
