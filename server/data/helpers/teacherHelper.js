const db = require('../../config/dbConfig');

module.exports = {
  getAll: async () => {
    const allTeachers = await db('teachers').select(
      'id',
      'firstname',
      'lastname',
      'email'
    );

    return allTeachers;
  },

  getTeacher: async id => {
    const teacher = await db('teachers')
      .select('id', 'firstname', 'lastname', 'email')
      .where({ id })
      .first();

    const classes = await db('classes').where('teacher_id', id);

    return Promise.all([teacher, classes]).then(response => {
      let [teacher, classes] = response;
      let result = {
        id: teacher.id,
        firstname: teacher.firstname,
        lastname: teacher.lastname,
        email: teacher.email,
        classes: classes
      };
      return result;
    });
  },

  updateTeacher: async (id, teacher) => {
    const updateCount = await db('teachers')
      .where({ id })
      .update(teacher);
    return updateCount;
  },

  /* delete teacher will currently throw a foreign key error 
  if the teacher has any classes. do we want the class to
  be deleted as well? we could add 'on delete cascade' to
  teachers if so, but i dunno if that's what we want
  */
  deleteTeacher: async id => {
    const deleteCount = await db('teachers')
      .where({ id })
      .del();
    return deleteCount;
  }
};
