/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import axios from 'axios';

export const getQuestions = (productId) => {
  return axios.get('/questions/', { params: { productId } })
    .then((qData) => {
      console.log('this is questions', qData);
      return qData.data.results;
    })
    .catch((err) => {
      console.log('error retrieving questions', err);
    });
};

export const getAnswers = (questionId) => {
  return axios.get('/answers/', { params: { questionId } })
    .then((aData) => {
      console.log('this is answers', aData);
      return aData.data.results;
    })
    .catch((err) => {
      console.log(`error retrieving answers for question ${questionId}`, err);
    });
};

export const postQuestion = (questionData) => {
  const options = {
    method: 'post',
    url: '/questions',
    data: questionData,
  };

  return axios(options)
    .then((data) => {
      console.log('return from posting question', data);
    })
    .catch((err) => {
      console.log('error posting new question', err);
    });
};

export const postAnswer = (answerData, questionId) => {
  const options = {
    method: 'post',
    url: '/answers',
    data: answerData,
    params: { questionId },
  };

  return axios(options)
    .then((data) => {
      console.log('return from posting answer', data);
    })
    .catch((err) => {
      console.log('error posting new question', err);
    });
};
