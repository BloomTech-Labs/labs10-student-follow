exports.up = function(knex, Promise) {
  return changeStudentNames().then(changeTeacherNames);

  function changeStudentNames() {
    return knex.schema.table('students', tbl => {
      tbl.renameColumn('firstname', 'first_name');
      tbl.renameColumn('lastname', 'last_name');
    });
  }

  function changeTeacherNames() {
    return knex.schema.table('teachers', tbl => {
      tbl.renameColumn('firstname', 'first_name');
      tbl.renameColumn('lastname', 'last_name');
    });
  }
};

exports.down = function(knex, Promise) {
  return knex.schema.changeStudentNames().then(changeTeacherNames);

  function changeStudentNames() {
    return knex.schema.table('students', tbl => {
      tbl.renameColumn('first_name', 'firstname');
      tbl.renameColumn('last_name', 'lastname');
    });
  }

  function changeTeacherNames() {
    return knex.schema.table('teachers', tbl => {
      tbl.renameColumn('first_name', 'firstname');
      tbl.renameColumn('last_name', 'lastname');
    });
  }
};
