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
  sortByHelpful,
  productName,
  question_body,
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
            ans.sort(sortByHelpful);
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
    <div className="questions__form--container questions__form--answer" id="q&a">
      <form className="questions__form questions__form--answer" id="q&a">
        <button className="questions__button questions__button--close" id="q&a" type="button" onClick={changeWindow}>Close</button>
        <h2 className="questions__form--title" id="q&a">Submit Your Answer</h2>
        <h4 className="questions__form--subtitle" id="q&a">
          {productName}
          {': '}
          {question_body}
        </h4>
        <label className="questions__form--label" id="q&a" htmlFor="body">
          Answer:
          <textarea maxLength="1000" className="questions__form--input" id="q&a" placeholder="Write your answer here" name="body" rows="5" cols="30" value={answer} onChange={handleAnswer} />
        </label>
        <label className="questions__form--label" id="q&a" htmlFor="name">
          Nickname:
          <input className="questions__form--input" id="q&a" placeholder="Example: jack543!" name="name" value={nickname} onChange={handleNickname} />
          <p className="questions__form--disclaimer" id="q&a">For privacy reasons, do not use your full name or email address</p>
        </label>
        <label className="questions__form--label" id="q&a" htmlFor="email">
          Email:
          <input className="questions__form--input" id="q&a" placeholder="Example: jack@email.com" name="email" value={email} onChange={handleEmail} />
          <p className="questions__form--disclaimer" id="q&a">For authentication reasons; you will not be emailed</p>
        </label>
        <button className="questions__button questions__button--submit" id="q&a" type="button" onClick={handleSubmit}>Submit Answer</button>
      </form>
    </div>
  );
}

export default AnswerModal;
