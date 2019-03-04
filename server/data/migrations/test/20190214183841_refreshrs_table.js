exports.up = function(knex, Promise) {
  return knex.schema.createTable('refreshrs', (tbl) => {
    tbl.increments();
    tbl.string('name');
    tbl.text('review_text');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('refreshrs');
};
