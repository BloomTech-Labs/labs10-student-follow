exports.up = function(knex, Promise) {
  return knex.schema.alterTable('classes_teachers', tbl => {
    tbl.integer('refreshr_1')
      .references('id')
      .inTable('refreshrs');
    tbl.integer('refreshr_2')
      .references('id')
      .inTable('refreshrs');
    tbl.integer('refreshr_3')
      .references('id')
      .inTable('refreshrs');
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.table('classes_teachers', tbl => {
    tbl.dropColumn('refreshr_1');
    tbl.dropColumn('refreshr_2');
    tbl.dropColumn('refreshr_3');
  })
  
};
