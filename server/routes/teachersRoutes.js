const express = require('express');
const router = express.Router();
const db = require('../data/helpers/teacherHelper');
const {
  emptyCheck,
  whitespaceCheck
} = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

/* CALLS TO TEACHERS TABLE */

router.get('/', async (req, res, next) => {
  try {
    const teachers = await db.getAll();
    res.status(responseStatus.success).json({ teachers });
  } catch (err) {
    next(err);
  }
});

/* 
Returns: 
teacher: {
  user_id, first_name, last_name, email
  classes: [{class_id, classname}],
  refreshrs: [{refreshr_id, name, typeform_url}]
}
*/

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const teacher = await db.getTeacherDetails(id);
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

/* CALLS TO TCR */

//CLASSES

//gets array of classes for the associated teacher
router.get('/:id/classes', async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await db.getTeacherDetails(id);
    res.status(responseStatus.success).json({ classes: results.classes });
  } catch (err) {
    if (TypeError) {
      console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

//Adds a link between the class and the teacher
router.post('/:id/classes', async (req, res, next) => {
  const { id } = req.params;
  const { class_id } = req.body;
  try {
    const results = await db.addClass(id, class_id);
    res.status(responseStatus.postCreated).json({
      message: `teacher with id ${id} added to class with id ${class_id} `,
      results
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Removes the link between the class and the teacher
router.delete('/:id/classes/:classID', async (req, res, next) => {
  const { id, classID } = req.params;
  try {
    const count = await db.removeClass(id, classID);
    res.status(responseStatus.success).json({ removedClasses: count });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//REFRESHRS

//gets array of all refreshrs for associated teacher
router.get('/:id/refreshrs', async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await db.getTeacherDetails(id);
    res.status(responseStatus.success).json({ refreshrs: results.refreshrs });
  } catch (err) {
    if (TypeError) {
      console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

//Adds a link between the refreshr and the teacher

router.post('/:id/refreshrs', async (req, res, next) => {
  const { id } = req.params;
  const { refreshr_id } = req.body;
  try {
    const results = await db.addRefreshr(id, refreshr_id);
    res.status(responseStatus.postCreated).json({
      message: `teacher with id ${id} added refreshr with id ${refreshr_id} `,
      results
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//removes the link between the Refreshr and the teacher
router.delete('/:id/refreshrs/:refreshrID', async (req, res, next) => {
  const { id, refreshrID } = req.params;
  try {
    const count = await db.removeRefreshr(id, refreshrID);
    res.status(responseStatus.success).json({ removedRefreshrs: count });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
