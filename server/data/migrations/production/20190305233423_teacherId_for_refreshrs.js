exports.up = function(knex, Promise) {
  return knex.schema.table('refreshrs', tbl => {
    tbl
      .string('teacher_id')
      .references('user_id')
      .inTable('teachers');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('refreshrs', tbl => {
    tbl.dropColumn('teacher_id');
  });
};
