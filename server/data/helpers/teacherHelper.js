const db = require('../../config/dbConfig');

module.exports = {
	getTeachers: async (id) => {
		const allTeachers = await db('teachers').select(
			'id',
			'firstname',
			'lastname',
			'email'
		);

		const teacher = await db('teachers')
			.select('id', 'firstname', 'lastname', 'email')
			.where({ id })
			.first();

		const classes = await db('classes')
			.select('classes.name')
			.join('classes_teachers', 'classes.id', 'classes_teachers.class_id')
			.where('teacher_id', id);

		if (id) {
			return Promise.all([teacher, classes]).then((response) => {
				let [teacher, classes] = response;
				let result = {
					id: teacher.id,
					firstname: teacher.firstname,
					lastname: teacher.lastname,
					email: teacher.email,
					classes: classes
				};
				return result;
			});
		}
		return allTeachers;
	},

	updateTeacher: async (id, teacher) => {
		const updateCount = await db('teachers')
			.where({ id })
			.update(teacher);
		return updateCount;
	},

	deleteTeacher: async (id) => {
		const deleteCount = await db('teachers')
			.where({ id })
			.del();
		return deleteCount;
	},

	registerTeacher: async (creds) => {
		const IDs = await db('teachers').insert(creds);
		const id = IDs[0];
		const query = await db('teachers')
			.where({ id })
			.first();
		return query;
	},
	loginTeacher: async (creds) => {
		const teacher = await db('teachers')
			.where({ email: creds.email })
			.first();

		return teacher;
	}
};
