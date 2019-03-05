exports.seed = async function(knex, Promise) {
  const students_classes = [];

  for (let i = 0; i < 500; i++) {
    const [class_id] = [
     Math.ceil(Math.random() * 500).toString()
    ];
    const [student_id] = [
      Math.ceil(Math.random() * 500).toString()
    ];
    students_classes.push({
      class_id: class_id,
      student_id: student_id
    });
  }
  await knex.raw('TRUNCATE TABLE students_classes RESTART IDENTITY CASCADE');
  await knex('students_classes').insert(students_classes);
};
