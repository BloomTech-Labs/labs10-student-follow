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

  getTeacher: async (id) => {
    const teacher = await db('teachers')
      .select('id', 'firstname', 'lastname', 'email')
      .where({ id })
      .first();

    const classes = await db('classes')
      .where('teacher_id', id);

    return Promise.all([teacher, classes]).then((response) => {
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

  deleteTeacher: async (id) => {
    const deleteCount = await db('teachers')
      .where({ id })
      .del();
    return deleteCount;
  },

  registerTeacher: async (creds) => {
    const IDs = await db('teachers').insert(creds);
    const id = IDs[0];
    const query = await db('teachers')
      .where({ id })
      .first();
    return query;
  },
  loginTeacher: async (creds) => {
    const teacher = await db('teachers')
      .where({ email: creds.email })
      .first();

    return teacher;
  }
};
