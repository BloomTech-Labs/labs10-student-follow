const express = require('express');
const router = express.Router();
const db = require('../data/helpers/studentsHelper');
const management = require('../authentication');
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

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const student = await db.getStudent(id);
    res.status(responseStatus.success).json({ student });
  } catch (err) {
    if (TypeError) {
      console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

router.post(
  '/',
  emptyCheck,
  whitespaceCheck,
  async (req, res, next) => {
    const { body } = req;
    console.log(body);
    try {
      const newStudentID = await db.addStudent(body);
      console.log('new student it:', newStudentID);
      res.status(responseStatus.postCreated).json({ newStudentID });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.put(
  '/:id',

  emptyCheck,
  whitespaceCheck,
  async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const updatedRecords = await db.updateStudent(id, body);
      res.status(responseStatus.success).json({ updatedRecords });
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await db.deleteStudent(id);
    res.status(responseStatus.success).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
