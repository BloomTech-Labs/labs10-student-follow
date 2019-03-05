exports.up = function(knex, Promise) {
  return knex.schema.createTable('teachers', tbl => {
    tbl
      .string('user_id', 500)
      .unique()
      .unsigned()
      .primary()
    tbl.string('role', 256).notNullable();
    tbl.string('first_name', 128).notNullable();
    tbl.string('last_name', 128).notNullable();
    tbl
      .string('email', 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('teachers');
};
