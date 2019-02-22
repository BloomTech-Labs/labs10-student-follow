exports.up = function(knex, Promise) {
  return knex.schema.table('refreshrs', tbl => {
    tbl.text('review_text');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('refreshrs', tbl => {
    tbl.dropColumn('review_text');
  });
};
