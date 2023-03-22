import axios from 'axios';

module.exports = {
  getQuestions: (productId) => {
    axios.get('/questions/', { params: { productId } })
      .then((qData) => {
        console.log('this is questions', qData);
        setQuestions(qData.data.results);
      })
      .catch((err) => {
        console.log('error retrieving questions', err);
      });
  },

  getAnswers: (questionId) => {
    axios.get('/answers/', { params: { questionId } })
      .then((aData) => {
        console.log('this is answers', aData);
        setAnswers(aData.data.results);
      })
      .catch((err) => {
        console.log(`error retrieving answers for question ${props.question.question_id}`, err);
      });
  },

  postQuestion: (questionData, callback) => {
    let options = {
      method: 'post',
      url: '/questions',
      data: questionData
    }

    axios(options)
      .then((data) => {
        console.log('return from posting question', data);
        getQuestions(questionData.product_id);
        callback();
      })
      .catch((err) => {
        console.log('error posting new question', err);
      });
  },

  postAnswer: (answerData, questionId, callback) => {
    let options = {
      method: 'post',
      url: '/answers',
      data: answerData,
      params: { questionId }
    }

    axios(options)
      .then((data) => {
        console.log('return from posting answer', data);
        getAnswers(props.questionId);
        callback();
      })
      .catch((err) => {
        console.log('error posting new question', err);
      })
  }

}

