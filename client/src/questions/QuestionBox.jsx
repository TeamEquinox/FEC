import React, { useState, useEffect } from 'react';
import Answers from './Answers.jsx'

const QuestionBox = (props) => {

  const [ answers, setAnswers ] = useState([]);
  // make API call to answers endpoint using question id (passed as key)
  return (
    <div className='question'>
      This is an Individual Question
      {/* map over results array from answers and pass to answer */}
    </div>
  )
}

export default QuestionBox;