const db = require('../../config/dbConfig');

module.exports = {
  getAll: async () => {
    const allStudents = await db('students');
    return allStudents;
  },

  getStudent: async id => {
    const student = await db('students')
      .where({ id })
      .first();

    const classes = await db('classes')
      .select(
        'teachers.first_name as first',
        'teachers.last_name as last',
        'classes.id as classID',
        'classes.name'
      )
      .join('teachers', 'classes.teacher_id', 'teachers.id')
      .join('students_classes', 'classes.id', 'students_classes.class_id')
      .join('students', 'students.id', 'students_classes.student_id')
      .where('students_classes.student_id', id);

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
            classname: c.name,
            teacher: `${c.first} ${c.last}`
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
    const newStudent = await db('students')
      .insert(student)
      .returning('id')
      .then(id => {
        return id;
      });
    return newStudent[0];
  }
};
