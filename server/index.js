require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

//middleware used before each request is handled==========
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`the incomming request type is a ${req.method} request`);
  console.log(`the incomming request url is ${req.url}`);
  next();
})

app.post('/', (req, res) => {
  console.log('hello from app.post')
  console.log(req.body)
  res.send('Hello, World!');
})


app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(process.env.PORT, (() => {
  console.log(`The server is listening on port ${process.env.PORT}`)
}))