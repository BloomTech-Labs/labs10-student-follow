const db = require('../../config/dbConfig');

module.exports = {
  /* CALLS TO CLASSES DB */
  getAll: async () => {
    const allClasses = await db('classes')
      .select('classes.name', 'classes.sg_list_id', 'tcr.sg_campaign_id')
      .join(
        'teachers_classes_refreshrs as tcr',
        'classes.sg_list_id',
        'tcr.class_id'
      );
    return allClasses;
  },

  getClass: async id => {
    const selectedClass = await db('classes')
      .where('sg_list_id', id)
      .first();

    const teacher = await db('teachers')
      .select(
        'teachers.user_id as t_id',
        'teachers.first_name as t_first',
        'teachers.last_name as t_last',
        'teachers.email as t_email'
      )
      .join(
        'teachers_classes_refreshrs as tcr',
        'teachers.user_id',
        'tcr.teacher_id'
      )
      .join('classes', 'classes.sg_list_id', 'tcr.class_id')
      .where('classes.sg_list_id', id);

    const students = await db('students')
      .join(
        'students_classes',
        'students.sg_recipient_id',
        'students_classes.student_id'
      )
      .join('classes', 'classes.sg_list_id', 'students_classes.class_id')
      .where('classes.sg_list_id', id);

    const refreshrs = await db('refreshrs')
      .select(
        'refreshrs.name as r_name',
        'refreshrs.typeform_id',
        'refreshrs.typeform_url',
        'tcr.sg_campaign_id',
        'tcr.date'
      )
      .join(
        'teachers_classes_refreshrs as tcr',
        'refreshrs.typeform_id',
        'tcr.refreshr_id'
      )
      .join('classes', 'classes.sg_list_id', 'tcr.class_id')
      .where('classes.sg_list_id', id);

    const campaigns = await db('teachers_classes_refreshrs as tcr')
      .select('tcr.sg_campaign_id', 'tcr.date')
      .join('classes', 'tcr.class_id', 'classes.sg_list_id')
      .where('classes.sg_list_id', id);

    return Promise.all([
      selectedClass,
      teacher,
      students,
      refreshrs,
      campaigns
    ]).then(response => {
      let [selectedClass, teacher, students, refreshrs, campaigns] = response;
      let result = {
        sg_list_id: selectedClass.sg_list_id,
        name: selectedClass.name,
        teachers: teacher.map(t => {
          return {
            teacher_id: t.t_id,
            name: `${t.t_first} ${t.t_last}`,
            email: t.t_email
          };
        }),
        students: students.map(s => {
          return {
            student_id: s.student_id,
            name: `${s.first_name} ${s.last_name}`,
            email: s.email
          };
        }),
        refreshrs: refreshrs.map(r => {
          return {
            refreshr_id: r.typeform_id,
            name: r.r_name,
            typeform_url: r.typeform_url,
            sg_campaign_id: r.sg_campaign_id,
            date: r.date
          };
        }),
        campaigns: campaigns.map(c => {
          return {
            campaign_id: c.sg_campaign_id,
            created_date: c.date
          };
        })
      };
      return result;
    });
  },

  addClass: async classInfo => {
    const newClassID = await db('classes')
      .insert(classInfo)
      .returning('sg_list_id');
    return newClassID[0];
  },

  updateClass: async (id, updatedClass) => {
    const updateCount = await db('classes')
      .where('sg_list_id', id)
      .update(updatedClass);
    return updateCount;
  },

  deleteClass: async id => {
    const deleteCount = await db('classes')
      .where('sg_list_id', id)
      .del();
    return deleteCount;
  },

  /* CALLS TO STUDENTS_CLASSES */

  addStudent: async (class_id, student_id) => {
    const result = await db('students_classes')
      .returning(['class_id', 'student_id'])
      .insert({ class_id, student_id });
    return result;
  },

  removeStudent: (class_id, student_id) => {
    return db('students_classes')
      .where({ class_id, student_id })
      .delete();
  },

  /* HELPERS FOR TCR CALLS */

  //REFRESHRS
  addRefreshr: async (class_id, refreshr_id) => {
    const result = await db('teachers_classes_refreshrs')
      .returning(['class_id', 'refreshr_id'])
      .insert({
        class_id,
        refreshr_id
      });
    return result;
  },

  removeRefreshr: (class_id, refreshr_id) => {
    return db('teachers_classes_refreshrs')
      .where({ class_id, refreshr_id })
      .delete();
  },

  //CAMPAIGNS
  addCampaign: async (class_id, body) => {
    const result = await db('teachers_classes_refreshrs')
      .returning(['class_id', 'refreshr_id', 'teacher_id'])
      .insert({
        class_id,
        ...body
      });
    return result;
  },

  cleanUpCampaigns: async (teacher_id, refreshr_id) => {
    const result = await db('teachers_classes_refreshrs')
      .where({ teacher_id, refreshr_id })
      .whereNull('sg_campaign_id')
      .delete();
  },

  removeCampaign: (class_id, sg_campaign_id) => {
    return db('teachers_classes_refreshrs')
      .where({ class_id, sg_campaign_id })
      .delete();
  }
};
