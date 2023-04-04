/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { postQuestion, getQuestions } from './calls';

function QuestionModal({
  product_id, show, updateQuestions, changeWindow, sortByHelpful,
}) {
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    postQuestion({
      body: question,
      name: nickname,
      email,
      product_id,
    })
      .then(() => {
        // console.log('made it back into questions modal')
        getQuestions(product_id)
          .then((questions) => {
            // console.log('questions from posting', questions);
            const sortedQs = questions.sort(sortByHelpful);
            updateQuestions(sortedQs);
          })
          .catch((err) => {
            console.log('error updating questions in modal', err);
          });
      })
      .catch((err) => {
        console.log('error posting new question', err);
      });
  };

  if (!show) {
    return null;
  }
  return (
    <div className="questions__form--container questions__form--question" id="q&a">
      <form className="questions__form questions__form--question" id="q&a">
        <button className="questions__button questions__button--close" id="q&a" type="button" onClick={changeWindow}>Close</button>
        <label className="questions__form--label" id="q&a" htmlFor="body">
          Question:
          <textarea className="questions__form--input" id="q&a" name="body" rows="5" cols="30" value={question} onChange={handleQuestion} />
        </label>
        <label className="questions__form--label" id="q&a" htmlFor="name">
          Nickname:
          <input className="questions__form--input" id="q&a" name="name" value={nickname} onChange={handleNickname} />
        </label>
        <label className="questions__form--label" id="q&a" htmlFor="email">
          Email:
          <input className="questions__form--input" id="q&a" name="email" value={email} onChange={handleEmail} />
        </label>
        <button className="questions__button questions__button--submit" id="q&a" type="button" onClick={handleSubmit}>Submit Question</button>
      </form>
    </div>
  );
}

export default QuestionModal;
