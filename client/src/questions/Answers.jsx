import React, { useState, useEffect } from 'react';

// note that these will be many answers for ONE QUESTION
const Answers = (props) => {
  return (
    <div className='answer'>
      <span>{props.answer.answerer_name}</span>
      <p>A: {props.answer.body}</p>
      <p>{props.answer.date}</p>
      <span>Is this helpful?
        <button type="button">Yes!</button>
        {props.answer.helpfulness}
      </span>
      <button type="button" className="report">Report</button>
    </div>
  )
}

export default Answers;