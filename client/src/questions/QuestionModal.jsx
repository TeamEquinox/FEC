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
    <div className="modal questionModal modal--open">
      <form className="form questionForm">
        <button type="button" onClick={changeWindow}>Close</button>
        <label htmlFor="body">
          Question:
          <textarea name="body" rows="5" cols="30" value={question} onChange={handleQuestion} />
        </label>
        <label htmlFor="name">
          Nickname:
          <input name="name" value={nickname} onChange={handleNickname} />
        </label>
        <label htmlFor="email">
          Email:
          <input name="email" value={email} onChange={handleEmail} />
        </label>
        <button type="button" onClick={handleSubmit}>Submit Question</button>
      </form>
    </div>
  );
}

export default QuestionModal;
