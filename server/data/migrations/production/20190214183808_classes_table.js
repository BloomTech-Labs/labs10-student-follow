exports.up = function(knex, Promise) {
  return knex.schema.createTable('classes', (tbl) => {
    tbl.increments();
    tbl.string('name');
    /*removed teachers_classes table: 1 teacher can have many classes
       but a class only has 1 teacher --CO */
    tbl
      .integer('teacher_id')
      .unsigned()
      .references('id')
      .inTable('teachers');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('classes');
};
