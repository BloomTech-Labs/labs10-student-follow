exports.up = function(knex, Promise) {
  return knex.schema.createTable('refreshrs', tbl => {
    tbl.string('name');
    tbl.text('review_text');
    tbl
      .string('typeform_id')
      .primary()
      .unsigned();
    tbl.string('typeform_url', 500);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('refreshrs');
};
