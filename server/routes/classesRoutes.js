const express = require('express');
const router = express.Router();
const db = require('../data/helpers/classesHelper');
const { emptyCheck } = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

router.get('/', async (req, res, next) => {
  try {
    const classes = await db.getAll();
    res.status(responseStatus.success).json({ classes });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const specifiedClass = await db.getClass(id);
    res.status(responseStatus.success).json({ specifiedClass });
  } catch (err) {
    if (TypeError) {
      console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

// drop a student from a class
router.delete('/:id/drop/:studentId', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { students } = req.body;
    const result = await db.removeStudents(id, students);
    res.status(responseStatus.success).json({ droppedStudents: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/', emptyCheck, async (req, res, next) => {
  const { body } = req;
  console.log('class:', body);

  try {
    const newClassID = await db.addClass(body);
    console.log('post route:', newClassID);
    res.status(responseStatus.postCreated).json({ newClassID });
  } catch (err) {
    next(err);
  }
});

// adds a single student to the class
router.post('/:id', async (req, res, next) => {
  const { student_id } = req.body;
  const class_id = req.params.id;
  try {
    await db.addStudent(class_id, student_id);
    res
      .status(responseStatus.success)
      .json('Student successfully added to class.');
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// assigns a refreshr to the class
router.post('/:id/refreshrs', async (req, res, next) => {
  const { id } = req.params;
  const { refreshr, teacher } = req.body;
  try {
    await db.addRefreshr(id, refreshr_id);
    res
      .status(responseStatus.success)
      .json({
        message: `refreshr ${refreshr_id} assigned to class ${id} with teacher ${teacher_id}`
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.put('/:id', emptyCheck, async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedRecords = await db.updateClass(id, body);
    res.status(responseStatus.success).json({ updatedRecords });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await db.deleteClass(id);
    res.status(responseStatus.success).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
