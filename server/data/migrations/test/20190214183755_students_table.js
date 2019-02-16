exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', (tbl) => {
    tbl.increments();
    tbl.string('firstname').notNullable();
    tbl.string('lastname').notNullable();
    tbl.string('email').notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
