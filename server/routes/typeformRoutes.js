const express = require('express');
const router = express.Router();
const db = require('../data/helpers/studentsHelper');
const jwtCheck = require('../middleware/authenticate');
const {
  emptyCheck,
  whitespaceCheck
} = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

router.get('/', async (req, res, next) => {
  try {
    const students = await db.getAll();
    res.status(responseStatus.success).json({ students });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
