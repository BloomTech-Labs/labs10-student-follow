exports.up = function(knex, Promise) {
    return knex.schema.createTable('classes', tbl => {
      tbl.increments();
      tbl.string('name');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('classes');
  };
  