import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Answers from './Answers';
import AnswerModal from './AnswerModal';
import { getAnswers } from './calls';

function QuestionBox({ question }) {
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

  // set answers once questions have loaded
  useEffect(() => {
    // setAnswers(sampleAns.results);
    getAnswers(question.question_id)
      .then((ans) => {
        setAnswers(ans);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('error getting answers on load', err);
      });
  }, []);

  return (
    <div className="question">
      <span>{question.asker_name}</span>
      <h3>
        Q:
        {question.question_body}
      </h3>
      <p>{question.question_date}</p>
      <span>Is this helpful?
        <button type="button">Yes!</button>
        {props.question.question_helpfulness}
      </span>
      <button type="button" className="report">Report</button>
      {answers.length === 0 && (<div>No answers yet!
        <button type="button">Add Answer</button>
      </div>)}
      {answers.length > 0 && (<div className="list answersList">
      {/* map over results array from answers and pass to answer */}
        {answers.map((ans) => {
          return <Answers answer={ans} key={ans.answer_id}/>
        })}
      <AnswerModal show={showAnsModal} updateAnswers={updateAnswers} productId={props.product_id} questionId={props.question.question_id}/>
      <button type="button" onClick={changeWindow}>Add Answer</button>
      </div>)}
    </div>
  );
}

QuestionBox.propTypes = {
  product_id: PropTypes.number.isRequired,
};

export default QuestionBox;
