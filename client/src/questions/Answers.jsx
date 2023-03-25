/* eslint-disable react/prop-types */
import React from 'react';

// note that these will be many answers for ONE QUESTION
function Answers({ answer }) {
  return (
    <div className="answer">
      <span>{answer.answerer_name}</span>
      <p>
        A:
        {answer.body}
      </p>
      <p>{answer.date}</p>
      <span>
        Is this helpful?
        <button type="button">Yes!</button>
        {answer.helpfulness}
      </span>
      <button type="button" className="report">Report</button>
    </div>
  );
}

export default Answers;
