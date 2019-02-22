exports.up = function(knex, Promise) {
  return knex.schema.table('questions', tbl => {
    tbl.dropColumn('review_text');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('questions', tbl => {
    tbl.text('review_text');
  });
};
