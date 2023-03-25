import React, { useState } from 'react';
import axios from 'axios';
import { postAnswer, getAnswers } from './calls.js';

const AnswerModal = (props) => {

  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  }

  const handleNickname = (e) => {
    setNickname(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    postAnswer({
      body: answer,
      name: nickname,
      email: email,
      photos: photos,
      product_id: props.productId
    }, props.questionId)
      .then((success) => {
        getAnswers(props.questionId)
          .then((ans) => {
            props.updateAnswers(ans);
          })
          .catch((err) => {
            console.log('error refreshing answers', err);
          })
      })
      .catch((err) => {
        console.log('error submitting answer', err);
      })
  }

  if (!props.show) {
    return null;
  } else {
    return (
      <div className="modal answerModal">
        <form className="form answerForm">
        <button type="button" onClick={props.closeModal}>Close</button>
          <label>Answer:
            <textarea name="aBody" rows="5" cols="30" value={answer} onChange={handleAnswer}></textarea>
          </label>
          <label>Nickname:
            <input name="answererName" value={nickname} onChange={handleNickname}></input>
          </label>
          <label>Email:
            <input name="email" value={email} onChange={handleEmail}></input>
          </label>
          {/* photos will require more examination to actually implement */}
          <label>Photos:
            <input name="photos"></input>
          </label>
        <button type="button" onClick={handleSubmit}>Submit answer</button>
        </form>
      </div>
    )
  }
}

export default AnswerModal;