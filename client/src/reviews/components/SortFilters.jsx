/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function SortFilters({ reviews, setSorted }) {
  const [sortDropdown, setSortDropdown] = useState('');

  const handleSortChange = (event) => {
    if (!reviews) {
      setSortDropdown(event.target.value);
      return;
    }
    let sortedReviews = [];
    if (event.target.value === 'Helpfullness') {
      sortedReviews = [...reviews].sort((a, b) => b.helpfulness - a.helpfulness);
    } else if (event.target.value === 'Newest') {
      sortedReviews = [...reviews].sort((a, b) => {
        const da = new Date(a.date);
        const db = new Date(b.date);
        return db - da;
      });
    } else {
      sortedReviews = [...reviews].sort((a, b) => {
        const diffA = Date.now() - new Date(a.date).getTime();
        const diffB = Date.now() - new Date(b.date).getTime();
        const scoreA = a.helpfulness / Math.log10(diffA + 1);
        const scoreB = b.helpfulness / Math.log10(diffB + 1);
        return scoreB - scoreA;
      });
    }
    setSorted(sortedReviews);
    setSortDropdown(event.target.value);
  };

  return (
    <div>
      <label className="sort_order" htmlFor="sort-order">Sort order: </label>
      <select id="sort-order" value={sortDropdown} onChange={handleSortChange}>
        <option value="" />
        <option value="Relevance">Relevance</option>
        <option value="Newest">Newest</option>
        <option value="Helpfullness">Helpful</option>
      </select>
    </div>
  );
}

export default SortFilters;
