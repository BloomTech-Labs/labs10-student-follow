exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions_refreshrs', tbl => {
    tbl.increments();
    tbl
      .string('refreshr_id')
      .unsigned()
      .references('typeform_id')
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
