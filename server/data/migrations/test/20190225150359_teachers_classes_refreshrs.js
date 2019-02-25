exports.up = function(knex, Promise) {
  return classDropTId()
    .then(refreshrDropCIdAndDate)
    .then(makeTCRTable);

  function classDropTId() {
    return knex.schema.table('classes', tbl => {
      tbl.dropColumn('teacher_id');
    });
  }

  function refreshrDropCIdAndDate() {
    return knex.schema.table('refreshrs', tbl => {
      tbl.dropColumn('class_id');
      tbl.dropColumn('date');
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
      tbl.date('date');
    });
  }
};

exports.down = function(knex, Promise) {
  return refreshrAddCIdAndDate()
    .then(classAddTId)
    .then(dropTCRTable);

  function refreshrAddCIdAndDate() {
    return knex.schema.table('refreshrs', tbl => {
      tbl
        .integer('class_id')
        .unsigned()
        .references('id')
        .inTable('classes');
      tbl.date('date');
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
