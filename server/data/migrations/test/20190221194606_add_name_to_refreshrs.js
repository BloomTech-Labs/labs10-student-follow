exports.up = function(knex, Promise) {
  return knex.schema.table('refreshrs', tbl => {
    tbl.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('refreshrs', tbl => {
    dropColumnIfExists('name');
  });
};
