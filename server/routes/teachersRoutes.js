const express = require('express');
const router = express.Router();
const db = require('../data/helpers/teacherHelper');
const jwtCheck = require('../middleware/authenticate');
const {
  emptyCheck,
  whitespaceCheck
} = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

router.get('/', async (req, res, next) => {
  try {
    const teachers = await db.getAll();
    res.status(responseStatus.success).json(teachers);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const teachersClasses = await db.getTeacher(id);
    res.status(responseStatus.success).json(teachersClasses);
  } catch (err) {
    if (TypeError) {
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

router.put(
  '/:id',
  jwtCheck,
  emptyCheck,
  whitespaceCheck,
  async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const updatedRecords = await db.updateTeacher(id, body);
      res.status(responseStatus.success).json({ updatedRecords });
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', jwtCheck, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await db.deleteTeacher(id);
    res.status(responseStatus.success).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
