const express = require('express');
const router = express.Router();
const db = require('../data/helpers/refreshrHelper');
const { emptyCheck } = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

/* REFRESHRS TABLE CALLS */

router.get('/', async (req, res, next) => {
  try {
    const refreshrs = await db.getAll();
    res.status(responseStatus.success).json({ refreshrs });
  } catch (err) {
    next(err);
  }
});

/*
Returns: 
refreshr: {
  name, review_text, 
  typeform_id, typeform_url,
  teachers:[{name, teacher_id, email}], 
  questions: [
    question_id, 
    question: {question_text, answer_1, answer_2, answer_3, answer_4}
  ]
}
*/
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const refreshr = await db.getRefreshr(id);
    res.status(responseStatus.success).json({ refreshr });
  } catch (err) {
    if (TypeError) {
      console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

/* Returns typeform_id as newRefreshrID*/
router.post('/', emptyCheck, async (req, res, next) => {
  const { body } = req;
  try {
    const newRefreshrID = await db.addRefreshr(body);
    console.log(newRefreshrID);
    res.status(responseStatus.postCreated).json({ newRefreshrID });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', emptyCheck, async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedRecords = await db.updateRefreshr(id, body);
    res.status(responseStatus.success).json({ updatedRecords });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await db.deleteRefreshr(id);
    res.status(responseStatus.success).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

/* QUESTION_REFRESHR TABLE CALLS */

/*
Adds refreshr question connections to questions_refreshrs table
returns the ID of the new connection
*/
router.post('/:id/questions', async (req, res, next) => {
  const { question_id } = req.body;
  const { id } = req.params;
  //console.log("q", question_id, 'r', refreshr_id)
  try {
    const results = await db.addQuestions(id, question_id);
    res.status(responseStatus.postCreated).json({ results });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id/questions/:questionID', async (req, res, next) => {
  const { id, questionID } = req.params;
  try {
    const count = await db.removeQuestion(id, questionID);
    res.status(responseStatus.success).json({ removedQuestions: count });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
