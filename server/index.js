const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

//middleware used before each request is handled==========
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`the incomming request type is a ${req.method} request`);
  console.log(`the incomming request url is ${req.url}`);
  next();
})






app.listen(process.env.PORT, (() => {
  console.log(`The server is listening on port ${process.env.PORT}`)
}))