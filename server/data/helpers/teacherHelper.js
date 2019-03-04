const db = require('../../config/dbConfig');

module.exports = {
  getAll: async () => {
    const allTeachers = await db('teachers').select(
      'user_id',
      'first_name',
      'last_name',
      'email'
    );

    return allTeachers;
  },

  getTeacher: async id => {
    const teacher = await db('teachers')
      .select('user_id', 'first_name', 'last_name', 'email')
      .where('user_id', id)
      .first();

    const classes = await db('classes')
      .select('classes.name as c_name', 'refreshrs.name as r_name', 'tcr.date', 'tcr.class_id')
      .join('teachers_classes_refreshrs as tcr', 'classes.sg_list_id', 'tcr.class_id')
      .join('refreshrs', 'refreshrs.id', 'tcr.refreshr_id')
      .join('teachers', 'teachers.user_id', 'tcr.teacher_id')
      .where('teachers.user_id', id);

    return Promise.all([teacher, classes]).then(response => {
      let [teacher, classes] = response;
      let result = {
        id: teacher.user_id,
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        email: teacher.email,
        classes: classes.map(c => {
          return {
            class_id: c.class_id,
            created_date: c.date,
            classname: c.c_name,
          };
        }),
      };
      return result;
    });
  },

  addTeacher: async (teacher) => {
    const newTeacherID= await db('teachers').insert(teacher)
    return newTeacherID[0]
  },
  updateTeacher: async (id, teacher) => {
    const updateCount = await db('teachers')
      .where({ id })
      .update(teacher);
    return updateCount;
  },

  deleteTeacher: async id => {
    const deleteCount = await db('teachers')
      .where({ id })
      .del();
    return deleteCount;
  }
};
