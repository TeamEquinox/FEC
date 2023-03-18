import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionModal = (props) => {

  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  }

  const handleNickname = (e) => {
    setNickname(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    axios.post('/questions', {
      qBody: question,
      askerName: nickname,
      email: email,
      product_id: props.productId
    })
      .then((success) => {
        props.closeModal();
        props.getQuestions(props.productId);
      })
      .catch((err) => {
        console.log('error posting new question', err);
      })
  }

  if (!props.show) {
    return null
  } else {
    return (
      <div className='modal questionModal modal--open'>
        <form className="form questionForm">
        <button type="button" onClick={props.closeModal}>Close</button>
          <label>Question:
            <textarea name="qBody" rows="5" cols="30" value={question} onChange={handleQuestion}></textarea>
          </label>
          <label>Nickname:
            <input name="askerName" value={nickname} onChange={handleNickname}></input>
          </label>
          <label>Email:
            <input name="email" value={email} onChange={handleEmail}></input>
          </label>
        <button type="button" onClick={handleSubmit}>Submit Question</button>
        </form>
      </div>
    )
  }
}

export default QuestionModal;