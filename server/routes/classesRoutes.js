const express = require('express');
const router = express.Router();
const db = require('../data/helpers/classesHelper');
const { emptyCheck } = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

/* CALLS TO CLASSES TABLE */

router.get('/', async (req, res, next) => {
  try {
    const classes = await db.getAll();
    res.status(responseStatus.success).json({ classes });
  } catch (err) {
    next(err);
  }
});

/*
Returns: 
specifiedClass: {
name, sg_list_id, 
teacher: [{teacher_id, name, email}],
students: [{student_id, name, email}],
refreshrs: [{refreshr_id, name, typeform_url}],
campaigns: [{campaign_id, created_date}]
}
*/
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const specifiedClass = await db.getClass(id);
    res.status(responseStatus.success).json({ specifiedClass });
  } catch (err) {
    if (TypeError) {
      //console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

/*
Returns sg_list_id as newClassID 
body must include:
name,
sg_list_id
*/
router.post('/', emptyCheck, async (req, res, next) => {
  const { body } = req;
  try {
    const newClassID = await db.addClass(body);
    res.status(responseStatus.postCreated).json({ newClassID });
  } catch (err) {
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

/* CALLS TO STUDENTS_CLASSES TABLE */

//returns an array of students
router.get('/:id/students', async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await db.getClass(id);
    res.status(responseStatus.success).json({ students: results.students });
  } catch (err) {
    if (TypeError) {
      //console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

/* adds a student to the class
 returns the id of that connection
*/
router.post('/:id/students', async (req, res, next) => {
  const { student_id } = req.body;
  const { id } = req.params;
  //console.log(student_id, class_id)
  try {
    const results = await db.addStudent(id, student_id);
    res
      .status(responseStatus.postCreated)
      .json({
        message: `Student with id ${student_id} added to class with id ${id}.`,
        results
      });
  } catch (err) {
    next(err);
  }
});
// drop a student from a class
router.delete('/:id/students/:studentID', async (req, res, next) => {
  const { id, studentID } = req.params;
  try {
    //console.log(id, studentId);
    const count = await db.removeStudent(id, studentID);
    res.status(responseStatus.success).json({ droppedStudents: count });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

/* CALLS TO TCR */

//REFRESHRS
//returns an array of refreshrs

router.get('/:id/refreshrs', async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await db.getClass(id);
    res.status(responseStatus.success).json({ refreshrs: results.refreshrs });
  } catch (err) {
    if (TypeError) {
      //console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

//adds a refreshr to a class
router.post('/:id/refreshrs', async (req, res, next) => {
  const { id } = req.params;
  const { refreshr_id } = req.body;
  try {
    const results = await db.addRefreshr(id, refreshr_id);
    res.status(responseStatus.postCreated).json({
      message: `Refreshr with id ${refreshr_id}  added to class with id ${id} `,
      results
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//Removes refreshrs from a class

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

//TEACHERS
// gets an array of teachers

router.get('/:id/teachers', async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await db.getClass(id);
    res.status(responseStatus.success).json({ teachers: results.teachers });
  } catch (err) {
    if (TypeError) {
      //console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

// CAMPAIGNS

// Returns an array of all campaigns associated with the class

router.get('/:id/campaigns', async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await db.getClass(id);
    res.status(responseStatus.success).json({ campaigns: results.campaigns });
  } catch (err) {
    if (TypeError) {
      //console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

/* assigns a campaign to the class
Body must include:
teacher_id,
refreshr_id,
date,
sg_campaign_id
*/
router.post('/:id/campaigns', async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const results = await db.addCampaign(id, body);
    res.status(responseStatus.postCreated).json({
      message: `Campaign with id ${
        body.sg_campaign_id
      } added to class with id ${id} `,
      results
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//Removes a campaign from a class

router.delete('/:id/campaigns/:campaignID', async (req, res, next) => {
  const { id, campaignID } = req.params;
  try {
    const count = await db.removeCampaign(id, campaignID);
    res.status(responseStatus.success).json({ removedCampaigns: count });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
