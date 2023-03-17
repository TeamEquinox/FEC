import React, { useState, useEffect } from 'react';
import QuestionBox from './QuestionBox.jsx';
import axios from 'axios';
import QuestionModal from './QuestionModal.jsx';


const QuestionsList = (props) => {

    // initialize state
  const [ questions, setQuestions ] = useState([]);
  const [ displayQs, setDisplayQs ] = useState([]);
  const [ displayIndex, setDisplayIndex ] = useState(0);
  const [ showModal, setShowModal ] = useState(false);
  // to retrieve questions, make API GET call to /qa/questions
  var getQuestions = (productId) => {
    axios.get('/questions/', { params: { productId } })
      .then((qData) => {
        // console.log('this is questions', qData);
        setQuestions(qData.data.results);
      })
      .catch((err) => {
        console.log('error retrieving questions', err);
      });
  }

  // update show modal
  var changeWindow = () => {
    setShowModal(!showModal);
  }

  // retrieve questions once product id is available
  useEffect(() => {
    // console.log('should be product ID', props.product_id);
    getQuestions(props.product_id);
  }, [props.product_id]);

  // render
  if (questions.length === 0) {
    return (
      <div className="list">
        <h2>Questions</h2>
        No questions yet...</div>
    )
  } else {
    return (
      <section className='list questionsList questionsList--extended'>
        <h2>Questions</h2>
        <div>
          {/* map over retrieved question list and pass them to the individual question item */}
          {questions.map((q) => {
            // console.log('this is the individual question', q);
            return <QuestionBox question={q} key={q.question_id}/>
          })}
          <button type="button" onClick={changeWindow}>Ask a Question!</button>
          <QuestionModal show={showModal} closeModal={changeWindow}/>
          {questions.length > 2 && (<button type="button">More AnsweredQuestions</button>)}
        </div>
      </section>
    )
  }
}

export default QuestionsList;
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