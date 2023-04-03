/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import axios from 'axios';

export const getQuestions = (productId) => {
  return axios.get('/questions/', { params: { productId } })
    .then((qData) => {
      // console.log('this is questions', qData);
      return qData.data.results;
    })
    .catch((err) => {
      console.log('error retrieving questions', err);
    });
};

export const getAnswers = (questionId) => {
  return axios.get('/answers/', { params: { questionId } })
    .then((aData) => {
      // console.log('this is answers', aData);
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
    .then(() => {
      // console.log('return from posting question', data);
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
    .then(() => {
      // console.log('return from posting answer', data);
    })
    .catch((err) => {
      console.log('error posting new question', err);
    });
};

export const putHelpfulQuestion = (questionId) => {
  // send helpful report to server
  // PUT REQUEST using questionId
  const options = {
    method: 'put',
    url: '/helpful',
    params: { questionId },
  };

  return axios(options)
    .then(() => {
      // console.log('success reporting question as helpful', success);
    })
    .catch((err) => {
      console.log('error reporting question as helpful', err);
    });
};

export const reportQuestion = (questionId) => {
  const options = {
    method: 'put',
    url: 'report',
    params: { questionId },
  };

  return axios(options)
    .then(() => {
      // console.log('success reporting question');
    })
    .catch((err) => {
      console.log('error reporting question', err);
    });
};

export const putHelpfulAnswer = (answerId, questionId) => {
  const options = {
    method: 'put',
    url: '/helpful',
    params: { answerId },
  };

  return axios(options)
    .then(() => {
      // console.log('thank you for your help!', success);
      getAnswers(questionId);
    })
    .catch((err) => {
      console.log('error posting helpful on answer', err);
    });
};

export const reportAnswer = (answerId) => {
  const options = {
    method: 'put',
    url: '/report',
    params: { answerId },
  };

  return axios(options)
    .then(() => {
      console.log('thank you for your report');
    })
    .catch((err) => {
      console.log('error reporting answer', err);
    });
};
