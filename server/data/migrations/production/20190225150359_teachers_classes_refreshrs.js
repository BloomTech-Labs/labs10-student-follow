exports.up = function(knex, Promise) {
  return knex.schema.createTable('teachers_classes_refreshrs', tbl => {
    tbl.increments();
    tbl
      .integer('class_id')
      .unsigned()
      .references('id')
      .inTable('classes');
    tbl
      .string('teacher_id')
      .unsigned()
      .references('user_id')
      .inTable('teachers');
    tbl
      .integer('refreshr_id')
      .unsigned()
      .references('id')
      .inTable('refreshrs');
    tbl.date('date');
    tbl.string('sg_campaign_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('teachers_classes_refreshrs');
};
