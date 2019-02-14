exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', tbl => {
    tbl.increments();
    tbl.text('review_text');
    tbl.text('question');
    tbl.string('wrong_answer_1');
    tbl.string('wrong_answer_2');
    tbl.string('wrong_answer_3');
    tbl.string('correct_answer');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('questions');
};
