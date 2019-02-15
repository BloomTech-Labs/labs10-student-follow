exports.up = function(knex, Promise) {
	return knex.schema.createTable('teachers_classes', (tbl) => {
		tbl.increments()
		tbl
			.integer('teacher_id')
			.unsigned()
			.references('id')
			.inTable('teachers');
		tbl
			.integer('class_id')
			.unsigned()
			.references('id')
			.inTable('classes');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('teachers_classes')
};
