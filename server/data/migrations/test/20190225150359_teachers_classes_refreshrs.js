exports.up = function(knex, Promise) {
  return classDropTId()
    .then(refreshrDropCId)
    .then(makeTCRTable);

  function classDropTId() {
    return knex.schema.table('classes', tbl => {
      tbl.dropColumn('teacher_id');
    });
  }

  function refreshrDropCId() {
    return knex.schema.table('refreshrs', tbl => {
      tbl.dropColumn('class_id');
    });
  }

  function makeTCRTable() {
    return knex.schema.createTable('teachers_classes_refreshrs', tbl => {
      tbl.increments();
      tbl
        .integer('class_id')
        .unsigned()
        .references('id')
        .inTable('classes');
      tbl
        .integer('teacher_id')
        .unsigned()
        .references('id')
        .inTable('teachers');
      tbl
        .integer('refreshr_id')
        .unsigned()
        .references('id')
        .inTable('refreshrs');
    });
  }
};

exports.down = function(knex, Promise) {
  return refreshrAddCId()
    .then(classAddTId)
    .then(dropTCRTable);

  function refreshrAddCId() {
    return knex.schema.table('refreshrs', tbl => {
      tbl
        .integer('class_id')
        .unsigned()
        .references('id')
        .inTable('classes');
    });
  }

  function classAddTId() {
    return knex.schema.table('classes', tbl => {
      tbl
        .integer('teacher_id')
        .unsigned()
        .references('id')
        .inTable('teachers');
    });
  }

  function dropTCRTable() {
    return knex.schema.dropTableIfExists('teachers_classes_refreshrs');
  }
};
