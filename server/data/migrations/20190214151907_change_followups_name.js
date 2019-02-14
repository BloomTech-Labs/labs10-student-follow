exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists('followups')
    .then(function() {
      return knex.schema.createTable('refreshrs', tbl => {
        tbl.increments();
        tbl.date('date');
        tbl.integer('question')
          .references('id')
          .inTable('questions');
      })
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('refreshrs');

};
