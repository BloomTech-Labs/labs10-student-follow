const express = require('express');
const router = express.Router();
const jwtCheck = require('../middleware/authMiddleware');
const db = require('../data/helpers/questionsHelper');
const responseStatus = require('../config/responseStatusConfig');

router.get('/', jwtCheck, async (req, res, next) => {
  try {
    const questions = await db.getAll();
    res.status(responseStatus.success).json({ questions });
  } catch (err) {
    next(err);
  }
});

/*
Returns: 
specifiedQuestion: {
  question,
  answer_1,
  answer_2,
  answer_3,
  answer_4
}
*/
router.get('/:id', jwtCheck, async (req, res, next) => {
  const { id } = req.params;
  try {
    const specifiedQuestion = await db.getQuestion(id);
    res.status(responseStatus.success).json({ specifiedQuestion });
  } catch (err) {
    if (TypeError) {
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

router.post('/', jwtCheck, async (req, res, next) => {
  const { body } = req;
  try {
    console.log('Posting in question route');
    const newQuestionID = await db.addQuestion(body);
    res.status(responseStatus.postCreated).json({ newQuestionID });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', jwtCheck, async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedRecords = await db.updateQuestion(id, body);
    res.status(responseStatus.success).json({ updatedRecords });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', jwtCheck, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await db.deleteQuestion(id);
    res.status(responseStatus.success).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
