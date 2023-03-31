/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Answers from './Answers';
import AnswerModal from './AnswerModal';
import { getAnswers, putHelpfulQuestion, reportQuestion } from './calls';

function QuestionBox({ question, product_id }) {
  const [answers, setAnswers] = useState([]);
  const [showAnsModal, setShowAnsModal] = useState(false);

  // control answer modal
  const changeWindow = () => {
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
    // set answers to updated array
    setAnswers(currentAns);
    // setAnswers(sampleAns.results);
    // getAnswers(question.question_id)
    //   .then((ans) => {
    //     setAnswers(ans);
    //   })
    //   .catch((err) => {
    //     // eslint-disable-next-line no-console
    //     console.log('error getting answers on load', err);
    //   });
  }, []);

  return (
    <div className="question">
      <span>{question.asker_name}</span>
      <h3>
        Q:
        {question.question_body}
      </h3>
      <p>{question.question_date}</p>
      <span>
        Is this helpful?
        <button type="button" onClick={handleHelpful}>Yes!</button>
        {question.question_helpfulness}
      </span>
      <button type="button" className="report" onClick={handleReport}>Report</button>
      {answers.length === 0 && (
        <div>
          No answers yet!
          <button type="button">Add Answer</button>
        </div>
      )}
      {answers.length > 0 && (
      <div className="list answersList">
        {/* map over results array from answers and pass to answer */}
        {answers.map((ans) => <Answers answer={ans} key={ans.answer_id} />)}
        <AnswerModal
          show={showAnsModal}
          updateAnswers={updateAnswers}
          product_id={product_id}
          question_id={question.question_id}
          changeWindow={changeWindow}
        />
        <button type="button" onClick={changeWindow}>Add Answer</button>
      </div>
      )}
    </div>
  );
}

export default QuestionBox;
