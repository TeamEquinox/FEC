/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import QuestionBox from './QuestionBox';
import QuestionModal from './QuestionModal';
import { getQuestions } from './calls';
// import useClickTracking from '../useClickTracking';

function QuestionsList({ product_id }) {
  // initialize state
  const [questions, setQuestions] = useState([]);
  // const [displayQs, setDisplayQs] = useState([]);
  // const [displayIndex, setDisplayIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // update show modal
  const changeWindow = () => {
    setShowModal(!showModal);
  };

  // set questions to pass through state
  const updateQuestions = (updated) => {
    setQuestions(updated);
    changeWindow();
  };

  // retrieve questions once product id is available
  useEffect(() => {
    // console.log('should be product ID', props.product_id);
    getQuestions(product_id)
      .then((questionData) => {
        setQuestions(questionData);
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
        No questions yet...
        <button name="askQuestion" type="button" onClick={changeWindow}>Ask a Question!</button>
        <QuestionModal
          show={showModal}
          product_id={product_id}
          updateQuestions={updateQuestions}
          changeWindow={changeWindow}
        />
      </div>
    );
  }
  return (
    <section className="list questionsList questionsList--extended">
      <h2>Questions</h2>
      <div>
        {/* map over retrieved question list and pass them to the individual question item */}
        {questions.map((q) => (
          <QuestionBox
            question={q}
            product_id={product_id}
            key={q.question_id}
          />
        ))}
        <button type="button" onClick={changeWindow}>Ask a Question!</button>
        <QuestionModal show={showModal} closeModal={changeWindow} productId={product_id} />
        {questions.length > 2 && (<button type="button">More AnsweredQuestions</button>)}
      </div>
    </section>
  );
}

export default QuestionsList;
// working on displaying 2 to start
// useEffect(() => {
//   // setDisplayQs([questions[displayIndex], questions[displayIndex + 1]]);
//   // console.log('inside useEffect to set displayQs', questions[qInd]);
//   console.log('typeof questions: ', typeof questions);
//   setTimeout(() => {console.log('display questions', displayQs)}, 10000);
//   setDisplayIndex((i) => {
//     console.log('display index', i)
//     return i + 2
//   })
// }, [questions])
