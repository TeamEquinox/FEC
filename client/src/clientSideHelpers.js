module.exports = {

  configRatings: (obj) => {
    var oneStar = Number(obj['1']);
    if (!oneStar) {
      oneStar = 0;
    }
    var twoStar = Number(obj['2']);
    if (!twoStar) {
      twoStar = 0;
    }
    var threeStar = Number(obj['3']);
    if (!threeStar) {
      threeStar = 0;
    }
    var fourStar = Number(obj['4']);
    if (!fourStar) {
      fourStar = 0;
    }
    var fiveStar = Number(obj['5']);
    if (!fiveStar) {
      fiveStar = 0;
    }
    var actualRating = ((oneStar * 1) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4) + (fiveStar * 5));
    var totalPossibleRating = ((oneStar + twoStar + threeStar + fourStar + fiveStar) * 5);
    var result = Math.round((actualRating/totalPossibleRating * 5) * 10) / 10;
    return result;
  },
  
  slideLeft: (elem) => {
    var slider = document.getElementById(elem);
    slider.scrollLeft = slider.scrollLeft - 190;
  },

  slideRight: (elem) => {
    var slider = document.getElementById(elem);
    slider.scrollLeft = slider.scrollLeft + 190
  },

  style: {
    textDecoration: "line-through"
  },

  mochData: [
    {
      id: 1,
      category: 'fun',
      name: 'Slater',
      'original_price': 65,
      'sale_price': 55,
      image: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      rating: {1: '3', 2: '5', 3: '3', 4: '8', 5: '10'}
    }, 
    {
      id: 2,
      category: 'Food',
      name: 'Pizza',
      'original_price': 12,
      'sale_price': 10,
      image: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      rating: {1: '0', 2: '0', 3: '0', 4: '2', 5: '20'}
    }, 
    {
      id: 3,
      category: 'Pants',
      name: 'Jeans',
      'original_price': 65,
      'sale_price': 'N/A',
      image: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      rating: {1: '3', 2: '1', 3: '1', 4: '2', 5: '8'}
    }
  ]
}