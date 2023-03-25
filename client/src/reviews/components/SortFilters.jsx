import React, { useState, useEffect } from 'react';

const SortFilters = ({ reviews, setSorted }) => {
  const [sortDropdown, setSortDropdown] = useState('');

  const handleSortChange = (event) => {
    if (!reviews) {
      setSortDropdown(event.target.value);
      return;
    }
    console.log(`User selected ${event.target.value}`);
    let sortedReviews = [];
    if (event.target.value === 'Helpfullness') {
      sortedReviews = [...reviews].sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      });
    } else if (event.target.value === 'Newest') {
      sortedReviews = [...reviews].sort((a, b) => {
        let da = new Date(a.date);
        let db = new Date(b.date);
        return db - da;
      });
    } else {
      sortedReviews = [...reviews].sort((a, b) => {
        let diffA = Date.now() - new Date(a.date).getTime();
        let diffB = Date.now() - new Date(b.date).getTime();
        let scoreA = a.helpfulness / Math.log10(diffA + 1);
        let scoreB = b.helpfulness / Math.log10(diffB + 1);
        return scoreB - scoreA;
      });
    }
    setSorted(sortedReviews);
    setSortDropdown(event.target.value);
  };

  return (
    <div>
      <label htmlFor="sort-order">Sort order:</label>
      <select id="sort-order" value={sortDropdown} onChange={handleSortChange}>
        <option value=""></option>
        <option value="Relevance">Relevance</option>
        <option value="Newest">Newest</option>
        <option value="Helpfullness">Helpful</option>
      </select>
    </div>
  )
}

export default SortFilters