/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { postAnswer, getAnswers } from './calls';

function AnswerModal({
  show,
  updateAnswers,
  product_id,
  question_id,
  changeWindow,
}) {
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [photos, setPhotos] = useState([]);

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    postAnswer({
      body: answer,
      name: nickname,
      email,
      photos,
      product_id,
    }, question_id)
      .then(() => {
        getAnswers(question_id)
          .then((ans) => {
            updateAnswers(ans);
          })
          .catch((err) => {
            console.log('error refreshing answers', err);
          });
      })
      .catch((err) => {
        console.log('error submitting answer', err);
      });
  };

  if (!show) {
    return null;
  }
  return (
    <div className="modal answerModal">
      <form className="form answerForm">
        <button type="button" onClick={changeWindow}>Close</button>
        <label htmlFor="body">
          Answer:
          <textarea name="body" rows="5" cols="30" value={answer} onChange={handleAnswer} />
        </label>
        <label htmlFor="name">
          Nickname:
          <input name="name" value={nickname} onChange={handleNickname} />
        </label>
        <label htmlFor="email">
          Email:
          <input name="email" value={email} onChange={handleEmail} />
        </label>
        {/* photos will require more examination to actually implement */}
        <label htmlFor="photos">
          Photos:
          <input name="photos" />
        </label>
        <button type="button" onClick={handleSubmit}>Submit answer</button>
      </form>
    </div>
  );
}

export default AnswerModal;
