require('dotenv').config();
const express = require('express');
const path = require('path');
const helperAPI = require('../helpers/helperAPIs.js');
const relatedHelpers = require('../helpers/relatedProductHelpers.js');
const questionsAPI = require('../helpers/questionsAPI.js');

const app = express();

//middleware used before each request is handled==========
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`the incoming request type is a ${req.method} request`);
  console.log(`the incoming request url is ${req.url}`);
  next();
})

app.get('/products', (req, res) => {
  let dataToSend = [];
  helperAPI.getProducts()
    .then((data) => {
      // console.log('data', data)
      // res.send(data)
      helperAPI.getProductsById(data[0].id)
        .then((data2) => {
          // console.log('data2', data2)
          // res.send(data2)
          dataToSend.push(data2)
          helperAPI.getProductsByStyle(data2.id)
            .then((data3) => {
              dataToSend.push(data3)
              helperAPI.getReviews(data2.id) // review queries
                .then((data4) => {
                  dataToSend.push(data4)
                  helperAPI.getMetaReviewData(data2.id)
                  .then((data5) => {
                    dataToSend.push(data5)
                    // console.log('queried data: ', data5)
                    res.send(dataToSend)
                  })
                })
            })
        })
    })
    .catch(err => {
      console.log('err', err)
    })
})

app.get('/relatedProducts', (req, res) => {
 relatedHelpers.relatedProducts(req.query.data)
 .then((data) => {
   return relatedHelpers.relatedProductInfo(data);
  })
  .then((data2) => {
  //  console.log('related Products Data from successfull realatedProductsInfo call ', data2);
    res.status(200).send(data2);
 })
 .catch((err) => res.status(400).send(err));
})

app.get('/questions', (req, res) => {
  console.log('you are inside the questions get route', req.query);
  // res.send('i made it into questions');
  // console.log('INSIDE /QUESTIONS ', req);
  questionsAPI.getQuestions(req, res);
})

app.get('/answers', (req, res) => {
  // console.log('you are in the answers route', req.query);
  questionsAPI.getAnswers(req, res);
})

app.post('/questions', (req, res) => {
  questionsAPI.postQuestion(req, res);
})

app.post('/answers', (req, res) => {
  questionsAPI.postAnswer(req, res);
})

app.post('/', (req, res) => {
  // console.log('hello from app.post')

  console.log(req.body)
  res.send('Hello, World!');
})


app.get('*', (req, res) => {
  res.redirect('/')
})



app.get('/reviews/:id', (req, res) => {
  // console.log('in /reviews')
  helperAPI.getReviews();
})

app.listen(process.env.PORT, (() => {
  console.log(`The server is listening on port ${process.env.PORT}`)
}))
