exports.up = function(knex, Promise) {
	return knex.schema.createTable('students_classes', (tbl) => {
		tbl
			.integer('student_id')
			.unsigned()
			.references('id')
			.inTable('students');
		tbl
			.integer('class_id')
			.unsigned()

			.references('id')
			.inTable('classes');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('students_classes');
};
