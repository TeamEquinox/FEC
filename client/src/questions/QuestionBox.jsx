/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Answers from './Answers';
import AnswerModal from './AnswerModal';
import { putHelpfulQuestion, reportQuestion } from './calls';

function QuestionBox({ question, product_id, sortByHelpful }) {
  const [answers, setAnswers] = useState([]);
  const [showAnsModal, setShowAnsModal] = useState(false);

  // control answer modal
  const changeWindow = () => {
    // console.log('ans modal should show');
    setShowAnsModal(!showAnsModal);
  };

  // function to pass to answer modal
  const updateAnswers = (data) => {
    setAnswers(data);
    changeWindow();
  };

  // report handler
  const handleReport = () => {
    reportQuestion(question.question_id);
  };
  // helpful handler
  const handleHelpful = () => {
    putHelpfulQuestion(question.question_id);
  };

  // set answers once questions have loaded
  useEffect(() => {
    const currentAns = [];
    // get array of object keys for question.answers.results
    const keys = Object.keys(question.answers);
    // iterate over that array
    keys.forEach((key) => {
      // add each corresponding answer to current ans array
      currentAns.push(question.answers[key]);
    });
    currentAns.sort(sortByHelpful);
    // set answers to updated array
    setAnswers(currentAns);
  }, []);

  return (
    <div className="question">
      <h3>
        Q:
        {' '}
        {question.question_body}
      </h3>
      <span>{question.asker_name}</span>
      <p>
        {new Date(question.question_date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
      <span>
        Is this helpful?
        <button type="button" onClick={handleHelpful}>Yes!</button>
        {question.question_helpfulness}
      </span>
      <button type="button" className="report" onClick={handleReport}>Report</button>
      {answers.length === 0 && (
        <div>
          No answers yet!
          <AnswerModal
            show={showAnsModal}
            updateAnswers={updateAnswers}
            product_id={product_id}
            question_id={question.question_id}
            changeWindow={changeWindow}
            sortByHelpful={sortByHelpful}
          />
          <button type="button" onClick={changeWindow}>Add Answer</button>
        </div>
      )}
      {answers.length > 0 && (
      <div className="list answersList">
        {/* map over results array from answers and pass to answer */}
        {answers.map((ans) => (
          <Answers
            answer={ans}
            key={ans.answer_id}
            question_id={question.question_id}
          />
        ))}
        <AnswerModal
          show={showAnsModal}
          updateAnswers={updateAnswers}
          product_id={product_id}
          question_id={question.question_id}
          changeWindow={changeWindow}
          sortByHelpful={sortByHelpful}
        />
        <button type="button" onClick={changeWindow}>Add Answer</button>
      </div>
      )}
    </div>
  );
}

export default QuestionBox;
