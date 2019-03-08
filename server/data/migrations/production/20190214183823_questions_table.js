exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', tbl => {
    tbl.increments();
    tbl.text('question');
    tbl.string('answer_1');
    tbl.string('answer_2');
    tbl.string('answer_3');
    tbl.string('answer_4');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('questions');
};
