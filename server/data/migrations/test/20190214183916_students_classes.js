exports.up = function(knex, Promise) {
  return knex.schema.createTable('students_classes', (tbl) => {
    tbl.increments();
    tbl
      .string('student_id')
      .unsigned()
      .references('sg_recipient_id')
      .inTable('students');
    tbl
      .string('class_id')
      .unsigned()
      .references('sg_list_id')
      .inTable('classes');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students_classes');
};
