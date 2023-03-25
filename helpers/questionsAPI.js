require('dotenv').config();
const axios = require('axios');

const getQuestions = (req, res) => {
  // set options
  const options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions',
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
    params: {
      // product_id: 71706,
      product_id: Number(req.query.productId),
      page: 1,
      count: 5,
    },
  };

  // make get req to questions with axios/options
  axios(options)
    .then((data) => {
      // on success, res.send the body
      // console.log('RETURNED FROM QA/QUESTIONS/ ', data.data)
      res.send(data.data);
    })
    .catch((err) => {
      console.log('error getting questions', err);
      res.send(err);
    });
};

const getAnswers = (req, res) => {
  const options = {
    method: 'get',
    // look up url params :question_id
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.query.questionId}/answers`,
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
  };

  // make get req to answers with axios/options
  axios(options)
    .then((data) => {
      // on success, res.send the body
      // console.log('ANSWERS', data.data);
      res.send(data.data);
    })
    .catch((err) => {
      console.log(`error getting answers for question ${req.query.questionId}`, err);
      res.send(err);
    });
};

const postQuestion = (req, res) => {
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions';

  axios.post(url, req.body, {
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
  })
    .then((success) => {
      // console.log('did it succeed? ', success);
      res.status(201).send(success.data);
    })
    .catch((err) => {
      console.log('error posting question in server', err);
      res.send(err);
    });
};

const postAnswer = (req, res) => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.query.questionId}/answers`;
  const options = {
    method: 'post',
    url,
    headers: {
      Authorization: `${process.env.TOKEN}`,
    },
    data: req.body,
  };

  axios(options)
    .then((created) => {
      res.send(created.data);
    })
    .catch((err) => {
      console.log(`error posting answer to question ${req.query.questionId}`, err);
      res.send(err);
    });
};

module.exports.getQuestions = getQuestions;
module.exports.getAnswers = getAnswers;
module.exports.postAnswer = postAnswer;
module.exports.postQuestion = postQuestion;
