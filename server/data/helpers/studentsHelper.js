const db = require('../../config/dbConfig');

module.exports = {
  getAll: async () => {
    const allStudents = await db('students');
    return allStudents;
  },

  getStudent: async id => {
    const student = await db('students')
      .where('sg_recipient_id', id)
      .first();

    const classes = await db('classes')
      .select(
        'classes.sg_list_id as class_id',
        'classes.name')
      .join('students_classes', 'classes.sg_list_id', 'students_classes.class_id')
      .join('students', 'students.sg_recipient_id', 'students_classes.student_id')
      .where('students.sg_recipient_id', id)

    return Promise.all([student, classes]).then(response => {
      let [student, classes] = response;
      let result = {
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        classes: classes.map(c => {
          return {
            classID: c.classID,
            classname: c.name
          };
        })
      };
      return result;
    });
  },

  updateStudent: async (id, student) => {
    const updateCount = await db('students')
      .where({ id })
      .update(student);
    return updateCount;
  },

  deleteStudent: async id => {
    const deleteCount = await db('students')
      .where({ id })
      .del();
    return deleteCount;
  },

  addStudent: async student => {
    const newStudentID = await db('students')
      .insert(student)
    return newStudentID[0];

  }
};
