exports.up = function(knex, Promise) {
  return knex.schema.createTable('teachers', table => {
    table.increments();
    table.string('firstname', 128).notNullable();
    table.string('lastname', 128).notNullable();
    table
      .string('email', 128)
      .notNullable()
      .unique();
    table.string('password', 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('teachers');
};
