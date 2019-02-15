exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
    tbl.increments();
    tbl.string('firstName');
    tbl.string('lastName');
    tbl.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
