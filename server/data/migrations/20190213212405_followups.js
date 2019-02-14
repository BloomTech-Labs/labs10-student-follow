exports.up = function(knex, Promise) {
  return knex.schema.createTable('followups', tbl => {
    tbl.increments();
    tbl.date('date');
    /*
    tbl
      .integer('question')
      .references('id')
      .inTable('questions');
      */
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('followups');
};
