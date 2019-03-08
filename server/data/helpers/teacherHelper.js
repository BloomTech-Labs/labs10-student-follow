const db = require('../../config/dbConfig');

module.exports = {

  /* CALLS TO TEACHERS DB */
  getAll: async () => {
    const allTeachers = await db('teachers')
    return allTeachers;
  },

  getTeacherDetails: async id => {
    const teacher = await db('teachers')
      .where('user_id', id)
      .first();

    const classes = await db('classes')
      .join('teachers_classes_refreshrs as tcr', 'classes.sg_list_id', 'tcr.class_id')
      .join('teachers', 'teachers.user_id', 'tcr.teacher_id')
      .where('teachers.user_id', id);

    const refreshrs = await db('refreshrs')
    .join('teachers_classes_refreshrs as tcr', 'refreshrs.typeform_id', 'tcr.refreshr_id')
    .join('teachers', 'teachers.user_id', 'tcr.teacher_id')
    .where('teachers.user_id', id);

    return Promise.all([teacher, classes, refreshrs]).then(response => {
      let [teacher, classes] = response;
      let result = {
        user_id: teacher.user_id,
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        email: teacher.email,
        classes: classes.map(c => {
          return {
            class_id: c.class_id,
            classname: c.name,
          };
        }),
        refreshrs: refreshrs.map(r => {
          return {
            refreshr_id: r.typeform_id,
            name: r.name,
            typeform_url: r.typeform_url,
          }
        })
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
  },

  /* HELPERS FOR TCR CALLS */

  //REFRESHRS
  addRefreshr: async (teacher_id, refreshr_id) => {
    const result = await db('teachers_classes_refreshrs')
      .returning(['teacher_id', 'refreshr_id'])
      .insert({
        teacher_id,
        refreshr_id
      });
    return result;
  },


  removeRefreshr: (teacher_id, refreshr_id) => {
    return db('teachers_classes_refreshrs')
    .where({teacher_id, refreshr_id})
    .delete()
  },


  //CLASSES
  addClass: async (teacher_id, class_id) => {
    const result = await db('teachers_classes_refreshrs')
      .returning(['teacher_id', 'class_id'])
      .insert({
        teacher_id,
        class_id
      });
    return result;
  },

  removeClass: (teacher_id, class_id) => {
    return db('teachers_classes_refreshrs')
    .where({teacher_id, class_id})
    .delete()
  }
  
};
