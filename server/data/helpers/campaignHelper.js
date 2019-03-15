const db = require('../../config/dbConfig');

module.exports = {
  getDates: async id => {
    //console.log(id)
    const campaigns = await db('teachers_classes_refreshrs')
      .select(
        'classes.name as classname',
        'classes.sg_list_id as classID',
        'refreshrs.typeform_url',
        'teachers_classes_refreshrs.sg_campaign_id',
        'teachers_classes_refreshrs.date',
        'teachers_classes_refreshrs.refreshr_id'
      )
      .join(
        'teachers',
        'teachers.user_id',
        'teachers_classes_refreshrs.teacher_id'
      )
      .join(
        'classes',
        'classes.sg_list_id',
        'teachers_classes_refreshrs.class_id'
      )
      .join(
        'refreshrs',
        'refreshrs.typeform_id',
        'teachers_classes_refreshrs.refreshr_id'
      )
      .where('teachers.user_id', id)
      .whereNotNull('sg_campaign_id')
      .whereNotNull('date');

    return campaigns;
  }
};
