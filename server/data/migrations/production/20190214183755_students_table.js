exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', (tbl) => {
    tbl.increments()
    tbl
    .string('user_id', 500)
    .notNullable()
    tbl.string('role', 256).notNullable();
    tbl.string('first_name').notNullable();
    tbl.string('last_name').notNullable();
    tbl.string('email').notNullable().unique();
    tbl.string('sg_recipient_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
