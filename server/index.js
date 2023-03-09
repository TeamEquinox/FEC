require('dotenv').config();
const express = require('express');
const path = require('path');
require('dotenv').config();
const productAPI = require('../helpers/productAPI.js')
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
  // console.log('req', req)
  // console.log('res', req)
  productAPI.getProducts()
    .then((data) => {
      console.log('data', data)
      res.send(data)
    })
})

app.post('/', (req, res) => {
  console.log('hello from app.post')

  console.log(req.body)
  res.send('Hello, World!');
})


app.get('*', (req, res) => {
  res.redirect('/')
})

app.get('/questions', (req, res) => {
  questionsAPI.getQuestions(req, res);
})

app.listen(process.env.PORT, (() => {
  console.log(`The server is listening on port ${process.env.PORT}`)
}))