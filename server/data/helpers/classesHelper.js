const db = require('../../config/dbConfig');

module.exports = {
  getAll: async () => {
    const allClasses = await db('classes');
    return allClasses;
  },

  getClass: async id => {
    const selectedClass = await db('classes')
      .where({ id })
      .first();

    const teacher = await db('teachers')
      .select(
        'teachers.id as t_id',
        'teachers.firstname as t_first',
        'teachers.lastname as t_last',
        'teachers.email as t_email'
      )
      .join('classes', 'teachers.id', 'classes.teacher_id')
      .where('classes.id', id);

    const students = await db('students')
      .join('students_classes', 'students.id', 'students_classes.student_id')
      .where('class_id', id);

    const refreshrs = await db('refreshrs')
      .select(
        'refreshrs.id',
        'refreshrs.date',
        'questions.id as question_id',
        'questions.review_text',
        'questions.question',
        'questions.wrong_answer_1',
        'questions.wrong_answer_2',
        'questions.wrong_answer_3',
        'questions.correct_answer'
      )
      .join(
        'questions_refreshrs',
        'refreshrs.id',
        'questions_refreshrs.refreshr_id'
      )
      .join('questions', 'questions.id', 'questions_refreshrs.question_id')
      .join('classes', 'refreshrs.class_id', 'classes.id')
      .where('classes.id', id);

    return Promise.all([selectedClass, teacher, students, refreshrs]).then(
      response => {
        let [selectedClass, teacher, students, refreshrs] = response;
        let result = {
          id: selectedClass.id,
          name: selectedClass.name,
          teacher: teacher.map(t => {
            return {
              teacher_id: t.t_id,
              name: `${t.t_first} ${t.t_last}`,
              email: t.t_email
            };
          }),
          students: students.map(s => {
            return {
              student_id: s.student_id,
              name: `${s.firstname} ${s.lastname}`,
              email: s.email
            };
          }),
          refreshrs: refreshrs.map(r => {
            return {
              refreshr_id: r.id,
              date: r.date,
              review_text: r.review_text,
              refreshr: {
                question_id: r.question_id,
                question: r.question,
                wrong_answer_1: r.wrong_answer_1,
                wrong_answer_2: r.wrong_answer_2,
                wrong_answer_3: r.wrong_answer_3,
                correct_answer: r.correct_answer
              }
            };
          })
        };
        return result;
      }
    );
  },

  addStudent: async (classID, studentID) => {
    const body = { classID, studentID };
    const ID = await db('students_classes').insert(body);

    return ID[0];
  },
  removeStudent: (classId, studentId) =>
    db('students_classes')
      .where({ student_id: studentId, class_id: classId })
      .delete(),

  getClassStudents: classId =>
    db('students_classes as sc')
      .join('students as s', 's.id', 'sc.student_id')
      .select('s.firstname', 's.lastname', 's.id')
      .where({ 'sc.class_id': classId }),

  getClassRefreshrs: classId =>
    db('teachers_classes_refreshrs as tcr')
      .join('refreshrs as r', 'r.id', 'tcr.refreshr_id')
      .select('r.name', 'r.id')
      .where('tcr.class_id', classId),

  addClass: async classInfo => {
    const newClassID = await db('classes')
      .insert(classInfo)
      .returning('id')
      .then(id => {
        return id;
      });
    return newClassID[0];
  },

  updateClass: async (id, updatedClass) => {
    const updateCount = await db('classes')
      .where({ id })
      .update(updatedClass);
    return updateCount;
  },

  deleteClass: async id => {
    const deleteCount = await db('classes')
      .where({ id })
      .del();
    return deleteCount;
  }
};
