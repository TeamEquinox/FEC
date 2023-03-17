import React, { useState, useEffect } from 'react';
import QuestionBox from './QuestionBox.jsx';

let sampleQs = {
  "product_id": "5",
  "results": [{
    "question_id": 37,
    "question_body": "Why is this product cheaper here than other sites?",
    "question_date": "2018-10-18T00:00:00.000Z",
    "asker_name": "williamsmith",
    "question_helpfulness": 4,
    "reported": false,
    "answers": {
      68: {
        "id": 68,
        "body": "We are selling it here without any markup from the middleman!",
        "date": "2018-08-18T00:00:00.000Z",
        "answerer_name": "Seller",
        "helpfulness": 4,
        "photos": []
      }
    }
  },
  {
    "question_id": 38,
    "question_body": "How long does it last?",
    "question_date": "2019-06-28T00:00:00.000Z",
    "asker_name": "funnygirl",
    "question_helpfulness": 2,
    "reported": false,
    "answers": {
      70: {
        "id": 70,
        "body": "Some of the seams started splitting the first time I wore it!",
        "date": "2019-11-28T00:00:00.000Z",
        "answerer_name": "sillyguy",
        "helpfulness": 6,
        "photos": [],
      },
      78: {
        "id": 78,
        "body": "9 lives",
        "date": "2019-11-12T00:00:00.000Z",
        "answerer_name": "iluvdogz",
        "helpfulness": 31,
        "photos": [],
      }
    }
  },
  {
    "question_id": 39,
    "question_body": "Does the right button display?",
    "question_date": "2019-06-28T00:00:00.000Z",
    "asker_name": "funnygirl",
    "question_helpfulness": 2,
    "reported": false,
    "answers": {
      80: {
        "id": 70,
        "body": "Some of the seams started splitting the first time I wore it!",
        "date": "2019-11-28T00:00:00.000Z",
        "answerer_name": "sillyguy",
        "helpfulness": 6,
        "photos": [],
      },
      85: {
        "id": 78,
        "body": "9 lives",
        "date": "2019-11-12T00:00:00.000Z",
        "answerer_name": "iluvdogz",
        "helpfulness": 31,
        "photos": [],
      }
    }
  }]
}

const QuestionsList = () => {

  const [questions, setQuestions] = useState([]);
  const [displayQs, setDisplayQs] = useState([]);
  // var qInd = 0;
  const [displayIndex, setDisplayIndex] = useState(0);
  // to retrieve questions, make API GET call to /qa/questions
  useEffect(() => {
    setQuestions(sampleQs.results);
  }, []);
  // working on displaying 2 to start
  // useEffect(() => {
  //   setDisplayQs([questions[qInd], questions[qInd + 1]]);
  //   // console.log('inside useEffect to set displayQs', questions[qInd]);
  // }, [])

  return (
    <section className='list questionsList questionsList--extended'>
      <div>
        {/* map over retrieved question list and pass them to the individual question item */}
        This is the QuestionsList
        {questions.map((q) => {
          // console.log('this is the individual question', q);
          return <QuestionBox question={q} key={q.question_id} />
        })}
        {questions.length > 2 && (<button type="button">More AnsweredQuestions</button>)}
      </div>
    </section>
  )
}







export default QuestionsList;