exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', (tbl) => {
    tbl.string('first_name').notNullable();
    tbl.string('last_name').notNullable();
    tbl.string('email').notNullable().unique();
    tbl.string('sg_recipient_id').notNullable().primary().unsigned()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
