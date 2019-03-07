exports.up = function(knex, Promise) {
  return knex.schema.createTable('teachers_classes_refreshrs', tbl => {
    tbl.increments();
    tbl
      .string('class_id')
      .unsigned()
      .references('sg_list_id')
      .inTable('classes');
    tbl
      .string('teacher_id')
      .unsigned()
      .references('user_id')
      .inTable('teachers');
    tbl
      .string('refreshr_id')
      .unsigned()
      .references('typeform_id')
      .inTable('refreshrs');
    tbl.date('date');
    tbl.string('sg_campaign_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('teachers_classes_refreshrs');
};
