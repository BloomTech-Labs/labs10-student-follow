const express = require('express');
const router = express.Router();
const db = require('../data/helpers/studentsHelper');
const jwtCheck = require('../middleware/authenticate');
const {
  emptyCheck,
  whitespaceCheck
} = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

const request = require('request');
const needle = require('needle');
const bodyExample = require('./bodyExample.json');
const headersExample = require('./headersExample.json');

// This route gets all of our forms
// Within the response, items => _links => display provides the public facing URL for each quiz
router.get('/', async (req, res, next) => {
  try {
    const forms = {
      method: 'GET',
      url: 'https://api.typeform.com/forms',
      headers: {
        Authorization: 'Bearer A7N7Mxo3cHvRyh7heJ4BErAzHYj4VTTsYT98MD77haXs'
      }
    };
    request(forms, function(error, response, body) {
      if (error) throw new Error(error);
      res.status(200).json(JSON.parse(body));
    });
  } catch (err) {
    console.log('ERR', err);
  }
});

var options = {
  headers: {
    Authorization: 'Bearer A7N7Mxo3cHvRyh7heJ4BErAzHYj4VTTsYT98MD77haXs'
  }
};

router.post('/', async (req, res, next) => {
  try {
    console.log('Body Example', bodyExample);
    var request = require('request');
    request.post(
      {
        url: 'https://api.typeform.com/forms',
        headers: {
          Authorization: 'Bearer A7N7Mxo3cHvRyh7heJ4BErAzHYj4VTTsYT98MD77haXs'
        },
        body: bodyExample
      },
      function(error, response, body) {
        console.log(body);
        res.end();
      }
    );
  } catch (error) {
    console.log('Err:', error);
  }
});

needle.post('https://api.typeform.com/forms', headersExample, function(
  err,
  resp
) {
  // you can pass params as a string or as an object.
  console.log('ERRORING', err);
  console.log('RESPONSE', resp.body);
});

module.exports = router;
