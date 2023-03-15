import React, { useState, useEffect } from 'react';
import Answers from './Answers.jsx'

let sampleAns = {
  "question": "1",
  "page": 0,
  "count": 5,
  "results": [
    {
      "answer_id": 8,
      "body": "What a great question!",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 8,
      "photos": [],
    },
    {
      "answer_id": 5,
      "body": "Something pretty durable but I can't be sure",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 5,
      "photos": []
    }
  ]
}

const QuestionBox = (props) => {

  const [ answers, setAnswers ] = useState([]);
  // make API call to answers endpoint using question id (passed as key)

  useEffect(() => {
    setAnswers(sampleAns.results);
  }, []);

  return (
    <div className='question'>
      <span>{props.question.asker_name}</span>
      <h3>{props.question.question_body}</h3>
      <p>{props.question.question_date}</p>
      <span>Is this helpful?
        <button type="button">Yes!</button>
        {props.question.question_helpfulness}
      </span>
      <button type="button" className="report">Report</button>
      <div className='list answersList'>
      {/* map over results array from answers and pass to answer */}
        {answers.map((ans) => {
          return <Answers answer={ans} key={ans.answer_id}/>
        })}
      </div>
    </div>
  )
}

export default QuestionBox;