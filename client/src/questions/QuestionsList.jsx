import React, { useState, useEffect } from 'react';
import QuestionBox from './QuestionBox.jsx';

const QuestionsList = () => {

  const [ questions, setQuestions ] = useState([{id: 0, question: 'what is a question?'}]);
  // to retrieve questions, make API GET call to /qa/questions

  return (
    <section className='list questionsList questionsList--extended'>
      <div>
        {/* map over retrieved question list and pass them to the individual question item */}
        This is the QuestionsList
        {questions.map((q) => {
          return <QuestionBox question={q} key={q.id}/>
        })}
      </div>
    </section>
  )
}







export default QuestionsList;