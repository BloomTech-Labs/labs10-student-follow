const db = require('../../config/dbConfig');

module.exports = {
	getAll: async () => {
		const allStudents = await db('students')
		return allStudents;
	},

	getStudent: async (id) => {
		const student = await db('students')
			.where({ id })
			.first();

		const classes = await db('classes')
			.join('students_classes', 'classes.id', 'students_classes.class_id')
			.where('student_id', id);

		return Promise.all([student, classes]).then((response) => {
			let [student, classes] = response;
			let result = {
				id: student.id,
				firstname: student.firstname,
				lastname: student.lastname,
				email: student.email,
				classes: classes
			};
			return result;
		});
	},

	updateStudent: async (id, student) => {
		const updateCount = await db('students')
			.where({ id })
			.update(student);
		return updateCount;
	},

	deleteStudent: async (id) => {
		const deleteCount = await db('students')
			.where({ id })
			.del();
		return deleteCount;
	},

	registerStudent: async (creds) => {
		const IDs = await db('students').insert(creds);
		const id = IDs[0];
		const query = await db('students')
			.where({ id })
			.first();
		return query;
	}
};
