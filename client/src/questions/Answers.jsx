/* eslint-disable react/prop-types */
import React from 'react';
import { putHelpfulAnswer } from './calls';

// note that these will be many answers for ONE QUESTION
// eslint-disable-next-line camelcase
function Answers({ answer, question_id }) {
  // handle helpful answer
  const handleHelpful = () => {
    putHelpfulAnswer(answer.answer_id, question_id);
  };

  return (
    <div className="questions__listElem questions__answer" id="q&a">
      <p className="questions__body--answer questions__body" id="q&a">
        A:
        {' '}
        {answer.body}
      </p>
      <span className="questions__name" id="q&a">
        By:
        {' '}
        {answer.answerer_name}
      </span>
      <p className="questions__date" id="q&a">
        {new Date(answer.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
      <span className="questions__helpful" id="q&a">
        Is this helpful?
        <button className="questions__button questions__button--helpful" id="q&a" type="button" onClick={handleHelpful}>
          Yes:
          {' '}
          {answer.helpfulness}
        </button>
      </span>
      <button className="questions__button questions__button--report" id="q&a" type="button">Report</button>
    </div>
  );
}

export default Answers;
