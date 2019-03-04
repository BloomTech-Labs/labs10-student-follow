const express = require('express');
const router = express.Router();
const db = require('../data/helpers/teacherHelper');
const management = require('../authentication');
const {
  emptyCheck,
  whitespaceCheck
} = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

router.get('/', async (req, res, next) => {
  try {
    const teachers = await db.getAll();
    res.status(responseStatus.success).json({ teachers });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const teacher = await db.getTeacher(id);
    res.status(responseStatus.success).json({ teacher });
  } catch (err) {
    if (TypeError) {
      console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

router.post('/', emptyCheck, whitespaceCheck, async (req, res, next) => {
  const { body } = req;
  try {
    const newTeacherID = await db.addTeacher(body);
    res.status(responseStatus.postCreated).json({ newTeacherID });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', emptyCheck, whitespaceCheck, async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedRecords = await db.updateTeacher(id, body);
    res.status(responseStatus.success).json({ updatedRecords });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await db.deleteTeacher(id);
    res.status(responseStatus.success).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
