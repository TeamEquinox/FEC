require('dotenv').config();
const express = require('express');
const path = require('path');
require('dotenv').config();
const productAPI = require('../helpers/helperAPIs.js');
const relatedHelpers = require('../helpers/relatedProductHelpers.js');

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
  let dataToSend = [];
  productAPI.getProducts()
    .then((data) => {
      console.log('data', data)
      // res.send(data)
      productAPI.getProductsById(data[0].id)
        .then((data2) => {
          console.log('data2', data2)
          // res.send(data2)
          dataToSend.push(data2)
          productAPI.getProductsByStyle(data2.id)
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

app.get('/relatedProducts', (req, res) => {
 relatedHelpers.relatedProducts(req.query.data)
 .then((data) => {
   return relatedHelpers.relatedProductInfo(data);
  })
  .then((data2) => {
   console.log('related Products Data from successfull realatedProductsInfo call ', data2);
    res.status(200).send(data2);
 })
 .catch((err) => res.status(400).send(err));
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