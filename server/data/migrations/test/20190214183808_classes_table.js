exports.up = function(knex, Promise) {
  return knex.schema.createTable('classes', (tbl) => {
    tbl.string('name').notNullable();
    tbl.string('sg_list_id').primary().unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('classes');
};
