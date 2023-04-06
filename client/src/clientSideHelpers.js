/* eslint-disable operator-assignment */
module.exports = {

  configRatings: (obj) => {
    let oneStar = Number(obj['1']);
    if (!oneStar) {
      oneStar = 0;
    }
    let twoStar = Number(obj['2']);
    if (!twoStar) {
      twoStar = 0;
    }
    let threeStar = Number(obj['3']);
    if (!threeStar) {
      threeStar = 0;
    }
    let fourStar = Number(obj['4']);
    if (!fourStar) {
      fourStar = 0;
    }
    let fiveStar = Number(obj['5']);
    if (!fiveStar) {
      fiveStar = 0;
    }
    const actualRating = ((oneStar * 1) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4)
    + (fiveStar * 5));
    const totalPossibleRating = ((oneStar + twoStar + threeStar + fourStar + fiveStar) * 5);
    const result = Math.round(((actualRating / totalPossibleRating) * 5) * 10) / 10;
    return result;
  },

  slideLeft: (elem) => {
    const slider = document.getElementById(elem);
    slider.scrollLeft = slider.scrollLeft - 181;
  },

  slideRight: (elem) => {
    const slider = document.getElementById(elem);
    slider.scrollLeft = slider.scrollLeft + 181;
    return slider;
  },

  style: {
    textDecoration: 'line-through',
  },

  extractOutfitData: (arr) => {
    const result = {};
    result.id = arr[0].id;
    result.name = arr[0].name;
    result.category = arr[0].category;
    result.original_price = arr[1].results[0].original_price;
    result.sale_price = arr[1].results[0].sale_price;
    result.image = arr[1].results[0].photos[0].url;
    result.rating = arr[3].ratings;
    return result;
  },

  getOutfit: (setOutfit) => {
    const outfit = localStorage.getItem('outfit');
    // console.log('TRYING  TO GET OUTFIT DATA', outfit);
    if (outfit === null) {
      setOutfit([]);
      return;
    }
    const parseOutfit = JSON.parse(outfit);
    setOutfit(parseOutfit);
  },

  saveItemToOutfit: (obj, setOutfit) => {
    let outfit = localStorage.getItem('outfit');
    if (!outfit) {
      outfit = [obj];
      localStorage.setItem('outfit', JSON.stringify(outfit));
      module.exports.getOutfit(setOutfit);
    } else {
      outfit = JSON.parse(outfit);
      let itemAlreadyExists = false;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < outfit.length; i++) {
        const outfitItem = outfit[i];
        if (outfitItem.id === obj.id) {
          itemAlreadyExists = true;
        }
      }
      if (!itemAlreadyExists) {
        localStorage.setItem('outfit', JSON.stringify([...outfit, obj]));
        module.exports.getOutfit(setOutfit);
      }
    }
  },

  removeItemFromOutfit: (id, setOutfit) => {
    let outfit = localStorage.getItem('outfit');
    outfit = JSON.parse(outfit);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < outfit.length; i++) {
      const outfitItem = outfit[i];
      if (outfitItem.id === id) {
        outfit.splice(i, 1);
      }
    }
    localStorage.setItem('outfit', JSON.stringify(outfit));
    module.exports.getOutfit(setOutfit);
  },
  checkIfCached: (productId, endpoint) => {
    console.log('checkIfCached----->', productId, endpoint);
    let cached = localStorage.getItem(endpoint);
    if (cached) {
      cached = JSON.parse(cached);
      if (cached[productId]) {
        const result = new Promise((resolve, reject) => {
          resolve(cached[productId]);
        });
        return result;
      }
    }
    return false;
  },

  addAPICallToCache: (data, endpoint) => {
    let cached = localStorage.getItem(endpoint);
    cached = JSON.parse(cached);
    cached[data.id] = data;
    localStorage.setItem(endpoint, JSON.stringify(cached));
  },
};
