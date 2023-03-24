import React, { useState, useEffect } from 'react';

const SortFilters = ({ reviews }) => {

  const [sort, setSort] = useState('');

  const handleSortChange = (event) => {
    console.log(`User selected ${event.target.value}`)
    if (event.target.value === 'Helpfullness') {
      let filteredHelpfullness = reviews.results.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      })
    } else if (event.target.value === 'Newest') {
      let filteredNewest = reviews.results.sort((a, b) => {
        let da = new Date(a.date);
        let db = new Date(b.date);
        return db - da;
      })
    } else {
      let filteredRelevance = reviews.results.sort((a, b) => {
        let diffA = Date.now() - new Date(a.date).getTime();
        let diffB = Date.now() - new Date(b.date).getTime();
        let scoreA = a.helpfulness / Math.log10(diffA + 1);
        let scoreB = b.helpfulness / Math.log10(diffB + 1);
        return scoreB - scoreA;
      })
    }
    setSort(event.target.value)
  };

  return (
    <div>
      <label htmlFor="sort-order">Sort order:</label>
      <select id="sort-order" value={sort} onChange={handleSortChange}>
        <option value=""></option>
        <option value="Relevance">Relevance</option>
        <option value="Newest">Newest</option>
        <option value="Helpfullness">Helpful</option>
      </select>
    </div>
  )
}

export default SortFilters