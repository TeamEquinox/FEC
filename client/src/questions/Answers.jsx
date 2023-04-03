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
    <div className="answer">
      <span>{answer.answerer_name}</span>
      <p>
        A:
        {' '}
        {answer.body}
      </p>
      <p>
        {new Date(answer.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
      <span>
        Is this helpful?
        <button type="button" onClick={handleHelpful}>Yes!</button>
        {answer.helpfulness}
      </span>
      <button type="button" className="report">Report</button>
    </div>
  );
}

export default Answers;
