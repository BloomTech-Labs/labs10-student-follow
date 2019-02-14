exports.up = function(knex, Promise) {
  return knex.schema.createTable('classes_teachers', tbl => {
    tbl
      .integer('teacher_id')
      .references('id')
      .inTable('teachers');
    tbl
      .integer('class_id')
      .references('id')
      .inTable('classes');
    tbl
      .integer('followup_1')
      .references('id')
      .inTable('followups');
    tbl
      .integer('followup_2')
      .references('id')
      .inTable('followups');
    tbl
      .integer('followup_3')
      .references('id')
      .inTable('followups');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('classes_teachers');
};
