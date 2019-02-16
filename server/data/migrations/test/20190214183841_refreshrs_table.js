exports.up = function(knex, Promise) {
  return knex.schema.createTable('refreshrs', (tbl) => {
    tbl.increments();
    tbl.date('date');
    tbl
      .integer('class_id')
      .unsigned()
      .references('id')
      .inTable('classes');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('refreshrs');
};
