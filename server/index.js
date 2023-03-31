/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const compression = require('compression');
const path = require('path');
const helperAPI = require('../helpers/helperAPIs');
const relatedHelpers = require('../helpers/relatedProductHelpers');
const questionsAPI = require('../helpers/questionsAPI');

const app = express();
app.use(compression());

// middleware used before each request is handled==========
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`the incoming request type is a ${req.method} request`);
  console.log(`the incoming request url is ${req.url}`);
  next();
});

app.get('/products', (req, res) => {
  const dataToSend = [];
  helperAPI.getProducts()
    .then((data) => {
      // console.log('data', data)
      // res.send(data)
      helperAPI.getProductsById(data[0].id)
        .then((data2) => {
          // console.log('data2', data2)
          // res.send(data2)
          dataToSend.push(data2);
          helperAPI.getProductsByStyle(data2.id)
            .then((data3) => {
              dataToSend.push(data3);
              helperAPI.getReviews(data2.id) // review queries
                .then((data4) => {
                  dataToSend.push(data4);
                  helperAPI.getMetaReviewData(data2.id)
                    .then((data5) => {
                      dataToSend.push(data5);
                      // console.log('queried data: ', data5)
                      res.send(dataToSend);
                    });
                });
            });
        });
    })
    .catch((err) => {
      console.log('err', err);
    });
});

app.get('/relatedProducts', (req, res) => {
  relatedHelpers.relatedProducts(req.query.data)
    .then((data) => relatedHelpers.relatedProductInfo(data))
    .then((data2) => {
      res.status(200).send(data2);
    })
    .catch((err) => res.status(400).send(err));
});

// app.get('/compare', (req, res) => {
//   helperAPI.getProductsById(req.query.data)
//     .then((data) => {
//       console.log('related Products Data from successfull compare call ', data);
//       res.status(200).send(data);
//     })
//     .catch((err) => res.status(400).send(err));
// });

app.get('/compare', (req, res) => {
  relatedHelpers.CompareDetailsList(req.query.data)
    .then((data) => {
      // console.log('related Products Data from successfull compare call ', data);
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
});

app.get('/setCurrentProduct', (req, res) => {
  relatedHelpers.UpdateDetailsList(req.query.data)
    .then((data) => {
      // console.log('related Products Data from successfull setCurrentProduct call ', data);
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
});

app.get('/questions', (req, res) => {
  // console.log('you are inside the questions get route', req.query);
  // res.send('i made it into questions');
  // console.log('INSIDE /QUESTIONS ', req);
  questionsAPI.getQuestions(req, res);
});

app.get('/answers', (req, res) => {
  // console.log('you are in the answers route', req.query);
  questionsAPI.getAnswers(req, res);
});

app.post('/questions', (req, res) => {
  // console.log('this is the question to post', req.body);
  questionsAPI.postQuestion(req, res);
});

app.post('/answers', (req, res) => {
  questionsAPI.postAnswer(req, res);
});

//  WIP
app.post('/reviews/:id/helpful', (req, res) => {
  const reviewId = req.params.id;
  helperAPI.helpfulReview(reviewId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.get('/reviews/:id', () => {
  helperAPI.getReviews();
});

app.post('/clickTrack', (req, res) => {
  helperAPI.sendClickTrack(req, res);
});
app.put('/report', (req, res) => {
  questionsAPI.report(req, res);
});

app.put('/helpful', (req, res) => {
  questionsAPI.putHelpful(req, res);
});

app.listen(process.env.PORT, (() => {
  console.log(`The server is listening on port ${process.env.PORT}`);
}));
