require('dotenv').config();
const axios = require('axios');

let getQuestions = (req, res) => {
  // set options
  let options = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions',
    headers: {
      'Authorization': `${process.env.TOKEN}`
    }
  }

  // make get req to questions with axios/options
  axios(options)
    .then((data) => {
      // on success, res.send the body
      res.send('this is the questions data', data);
    })
    .catch((err) => {
      console.log('error getting questions', err);
      res.send(err);
    });
}

let getAnswers = (req, res) => {
  let options = {
    method: 'get',
    // look up url params :question_id
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.body.question_id}/answers`,
    headers: {
      'Authorization': `${process.env.TOKEN}`
    }
  }

  // make get req to answers with axios/options
  axios(options)
    .then((data) => {
      // on success, res.send the body
      res.send(`this is the answer data for question ${req.body.question_id}`, data);
    })
    .catch((err) => {
      console.log('error getting questions', err);
      res.send(err);
    });
}

module.exports.getQuestions = getQuestions;