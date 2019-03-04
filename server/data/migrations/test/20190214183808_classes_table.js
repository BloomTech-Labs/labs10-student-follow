exports.up = function(knex, Promise) {
  return knex.schema.createTable('classes', (tbl) => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.string('sg_list_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('classes');
};
