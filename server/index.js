require('dotenv').config();
const express = require('express');
const path = require('path');
const helperAPI = require('../helpers/helperAPIs.js')

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
  helperAPI.getProducts()
    .then((data) => {
      console.log('data', data)
      // res.send(data)
      helperAPI.getProductsById(data[0].id)
        .then((data2) => {
          console.log('data2', data2)
          // res.send(data2)
          dataToSend.push(data2)
          helperAPI.getProductsByStyle(data2.id)
            .then((data3) => {
              dataToSend.push(data3)
              res.send(dataToSend)
            })
        })
    })
    .catch(err => {
      console.log('err', err)
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


app.listen(process.env.PORT, (() => {
  console.log(`The server is listening on port ${process.env.PORT}`)
}))