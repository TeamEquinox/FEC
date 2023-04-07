/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Answers from './Answers';
import AnswerModal from './AnswerModal';
import { putHelpfulQuestion, reportQuestion } from './calls';

function QuestionBox({
  question, product_id, sortByHelpful, productName,
}) {
  const [answers, setAnswers] = useState([]);
  const [showAnsModal, setShowAnsModal] = useState(false);
  const [ansDisplayCount, setAnsDisplayCount] = useState(2);

  // show more answers
  const showMoreAnswers = () => {
    setAnsDisplayCount(ansDisplayCount + 2);
  };

  const collapseAnswers = () => {
    setAnsDisplayCount(2);
  };

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
    <div className="questions__listElem" id="q&a">
      <p className="questions__date" id="q&a">
        {new Date(question.question_date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
      <h3 className="questions__body" id="q&a">
        Q:
        {' '}
        {question.question_body}
      </h3>
      <span className="questions__name" id="q&a">
        By:
        {' '}
        {question.asker_name}
      </span>
      <span className="questions__helpful" id="q&a">
        Is this helpful?
        <button className="questions__button questions__button--helpful" id="q&a" type="button" onClick={handleHelpful}>
          Yes:
          {' '}
          {question.question_helpfulness}
        </button>
      </span>
      <span className="questions__divider" id="q&a">|</span>
      <button className="questions__button questions__button--report" id="q&a" type="button" onClick={handleReport}>Report</button>
      {answers.length === 0 && (
        <div className="questions__list--empty questions__list--answers" id="q&a">
          <h4 className="questions__list--titleAns" id="q&a">Answers</h4>
          <p className="questions__empty" id="q&a">Be the first to answer!</p>
          <AnswerModal
            show={showAnsModal}
            updateAnswers={updateAnswers}
            product_id={product_id}
            question_id={question.question_id}
            changeWindow={changeWindow}
            sortByHelpful={sortByHelpful}
            productName={productName}
            question_body={question.question_body}
          />
          <button className="questions__button questions__button--answer" id="q&a" type="button" onClick={changeWindow}>Add Answer</button>
        </div>
      )}
      {answers.length > 0 && (
      <div className="questions__list questions__list--answers" id="q&a" style={{ height: '300px' }}>
        <h4 className="questions__list--titleAns" id="q&a">Answers</h4>
        {answers.slice(0, ansDisplayCount).map((ans) => (
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
          productName={productName}
          question_body={question.question_body}
        />
        <button className="questions__button questions__button--answer" id="q&a" type="button" onClick={changeWindow}>Add Answer</button>
        {answers.length > ansDisplayCount && (<button className="questions__button questions__button--extend" id="q&a" type="button" onClick={showMoreAnswers}>See More Answers</button>)}
        {answers.length === ansDisplayCount && (<button className="questions__button questions__button--extend" id="q&a" type="button" onClick={collapseAnswers}>Collapse Answers</button>)}
      </div>
      )}
    </div>
  );
}

export default QuestionBox;
