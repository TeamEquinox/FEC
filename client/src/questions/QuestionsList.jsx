import React, { useState, useEffect } from 'react';
import QuestionBox from './QuestionBox.jsx';
import axios from 'axios';


const QuestionsList = (props) => {

  const [questions, setQuestions] = useState([]);
  const [displayQs, setDisplayQs] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0);
  // to retrieve questions, make API GET call to /qa/questions
  var getQuestions = (productId) => {
    axios.get('/questions/', { params: { productId } })
      .then((qData) => {
        console.log('this is questions', qData);
        setQuestions(qData.data.results);
      })
      .catch((err) => {
        console.log('error retrieving questions', err);
      });
  }

  useEffect(() => {
    console.log('should be product ID', props.product_id);
    getQuestions(props.product_id);
  }, [props.product_id]);
  // working on displaying 2 to start
  // useEffect(() => {
  //   // setDisplayQs([questions[displayIndex], questions[displayIndex + 1]]);
  //   // console.log('inside useEffect to set displayQs', questions[qInd]);
  //   console.log('typeof questions: ', typeof questions);
  //   setTimeout(() => {console.log('display questions', displayQs)}, 10000);
  //   setDisplayIndex((i) => {
  //     console.log('display index', i)
  //     return i + 2
  //   })
  // }, [questions])
  if (questions.length === 0) {
    return (
      <div className="list">No questions yet...</div>
    )
  } else {
    return (
      <section className='list questionsList questionsList--extended'>
        <div>
          {/* map over retrieved question list and pass them to the individual question item */}
          {questions.map((q) => {
            // console.log('this is the individual question', q);
            return <QuestionBox question={q} key={q.question_id} />
          })}
          <button type="button">Ask a Question!</button>
          {questions.length > 2 && (<button type="button">More AnsweredQuestions</button>)}
        </div>
      </section>
    )
  }
}

export default QuestionsList;