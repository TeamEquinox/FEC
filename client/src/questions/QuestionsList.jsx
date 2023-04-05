/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import QuestionBox from './QuestionBox';
import QuestionModal from './QuestionModal';
import { getQuestions } from './calls';
import SearchQuestions from './Search';

function QuestionsList({ product_id }) {
  // initialize state
  const [questions, setQuestions] = useState([]);
  const [displayCount, setDisplayCount] = useState(2);
  const [showModal, setShowModal] = useState(false);
  // update show modal
  const changeWindow = () => {
    setShowModal(!showModal);
  };

  // set questions to pass through state to modal
  const updateQuestions = (updated) => {
    setQuestions(updated);
    changeWindow();
  };

  // set questions to pass thru state to search
  const setSearchedQuestions = (filtered) => {
    setQuestions(filtered);
  };

  const showMoreQuestions = () => {
    setDisplayCount(displayCount + 2);
  };

  // compare fn for sorting questions
  const sortByHelpful = (a, b) => {
    let helpA;
    let helpB;
    if (a.question_helpfulness !== undefined) {
      helpA = a.question_helpfulness;
      helpB = b.question_helpfulness;
    } else if (a.helpfulness !== undefined) {
      helpA = a.helpfulness;
      helpB = b.helpfulness;
    }
    if (helpA < helpB) {
      return 1;
    } else if (helpA > helpB) {
      return -1;
    }
    return 0;
  };

  // retrieve questions once product id is available
  useEffect(() => {
    // console.log('should be product ID', props.product_id);
    getQuestions(product_id)
      .then((questionData) => {
        const sortedQs = questionData.sort(sortByHelpful);
        setQuestions(sortedQs);
      })
      .catch((err) => {
        console.log('error getting questions on load', err);
      });
  }, [product_id]);

  // render
  if (questions.length === 0) {
    return (
      <div className="list">
        <h2>Questions</h2>
        <SearchQuestions
          questions={questions}
          setQuestions={setSearchedQuestions}
          product_id={product_id}
        />
        No questions yet...
        <button name="askQuestion" type="button" onClick={changeWindow}>Ask a Question!</button>
        <QuestionModal
          show={showModal}
          product_id={product_id}
          updateQuestions={updateQuestions}
          changeWindow={changeWindow}
          sortByHelpful={sortByHelpful}
        />
      </div>
    );
  }
  return (
    <section className="list questionsList questionsList--extended">
      <h2>Questions</h2>
      <SearchQuestions
        questions={questions}
        setQuestions={setSearchedQuestions}
        product_id={product_id}
        sortByHelpful={sortByHelpful}
      />
      <div>
        {/* map over retrieved question list and pass them to the individual question item */}
        {questions.slice(0, displayCount).map((q) => (
          <QuestionBox
            question={q}
            product_id={product_id}
            key={q.question_id}
            sortByHelpful={sortByHelpful}
          />
        ))}
        <button type="button" onClick={changeWindow}>Ask a Question!</button>
        <QuestionModal
          show={showModal}
          product_id={product_id}
          updateQuestions={updateQuestions}
          changeWindow={changeWindow}
          sortByHelpful={sortByHelpful}
        />
        {questions.length > displayCount && (<button type="button" onClick={showMoreQuestions}>More Answered Questions</button>)}
      </div>
    </section>
  );
}

export default QuestionsList;
