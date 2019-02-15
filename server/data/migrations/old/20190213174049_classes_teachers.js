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
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('classes_teachers');
};
