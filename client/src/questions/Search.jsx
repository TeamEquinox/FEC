/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { getQuestions } from './calls';

function SearchQuestions({
  questions, setQuestions, product_id, sortByHelpful,
}) {
  const [query, setQuery] = useState('');

  // handle input change updates query
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // handleSearch filters the questions/answers
  const handleSearch = () => {
    // as long as query is <=3
    if (query.length >= 3) {
      const filteredQs = [];
      // iterate over questions
      for (let i = 0; i < questions.length; i += 1) {
        const question = questions[i];
        // if question.question_body includes query
        if (question.question_body.includes(query)) {
          // add that question to filterQ array
          filteredQs.push(question);
        }
      }
      // set questions to filtered ones
      setQuestions(filteredQs);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  const clearSearch = () => {
    getQuestions(product_id)
      .then((questionData) => {
        const sortedQs = questionData.sort(sortByHelpful);
        setQuestions(sortedQs);
        setQuery('');
      })
      .catch((err) => {
        console.log('error getting questions from clearing', err);
      });
  };

  return (
    <div>
      <label htmlFor="searchQuestions">
        Have a question? Search for answers...
        <input name="search" value={query} onChange={handleInputChange} />
      </label>
      <button type="button" aria-label="search" onClick={handleSearch}>Search</button>
      <button type="button" aria-label="clear" onClick={clearSearch}>Clear</button>
    </div>
  );
}

export default SearchQuestions;
