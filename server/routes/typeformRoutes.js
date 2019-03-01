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

// This route gets all of our forms
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

module.exports = router;
