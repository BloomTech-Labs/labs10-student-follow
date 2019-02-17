exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions_refreshrs', (tbl) => {
    tbl.increments();
    tbl
      .integer('refreshr_id')
      .unsigned()
      .references('id')
      .inTable('refreshrs');
    tbl
      .integer('question_id')
      .unsigned()
      .references('id')
      .inTable('questions');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('questions_refreshrs');
};
