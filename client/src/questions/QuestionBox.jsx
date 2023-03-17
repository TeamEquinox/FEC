import React, { useState, useEffect } from 'react';
import Answers from './Answers.jsx'
import axios from 'axios';
import AnswerModal from './AnswerModal.jsx';


const QuestionBox = (props) => {

  const [ answers, setAnswers ] = useState([]);
  const [ showAnsModal, setShowAnsModal ] = useState(false);
  // make API call to answers endpoint using question id (passed as key)
  var getAnswers = (questionId) => {
    axios.get('/answers/', { params: { questionId } })
      .then((aData) => {
        console.log('this is answers', aData);
        setAnswers(aData.data.results);
      })
      .catch((err) => {
        console.log(`error retrieving answers for question ${props.question.question_id}`, err);
      });
  }

  // control answer modal
  var changeWindow = () => {
    setShowAnsModal(!showAnsModal);
  }

  // set answers once questions have loaded
  useEffect(() => {
    // setAnswers(sampleAns.results);
    getAnswers(props.question.question_id);
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
      {answers.length === 0 && (<div>No answers yet!
        <button type="button">Add Answer</button>
      </div>)}
      {answers.length > 0 && (<div className='list answersList'>
      {/* map over results array from answers and pass to answer */}
        {answers.map((ans) => {
          return <Answers answer={ans} key={ans.answer_id}/>
        })}
      <AnswerModal show={showAnsModal} closeModal={changeWindow}/>
      <button type="button" onClick={changeWindow}>Add Answer</button>
      </div>)}
    </div>
  )
}

export default QuestionBox;
