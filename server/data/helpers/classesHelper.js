const db = require('../../config/dbConfig');

module.exports = {
	getClasses: async (id) => {
		const allClasses = await db('classes').select('id', 'name');

		const selectedClass = await db('classes')
			.select('id', 'name')
			.where({ id })
			.first();

		const teacher = await db('teachers')
			.select('teachers.firstname', 'teachers.lastname', 'teachers.email')
			.join('classes_teachers', 'teachers.id', 'classes_teachers.teachers_id')
			.where('classes_id', id);

		const students = await db('students')
			.select('students.firstName', 'students.lastName', 'students.email')
			.join('students_classes', 'students.id', 'students_classes.students_id')
			.where('classes_id', id);
		const followups = await db('followups')
			.select('followups.id', 'followups.date', 'followups.question')
			.join('classes_teachers', 'followups.id', 'classes_teachers.followup_1')
			.join('classes_teachers', 'followups.id', 'classes_teachers.followup_2')
			.join('classes_teachers', 'followups.id', 'classes_teachers.followup_3')
			.where('classes_id', id);

		if (id) {
			return Promise.all([selectedClass, teacher, students, followups]).then(
				(response) => {
					let [selectedClass, teacher, students, followups] = response;
					let result = {
						id: selectedClass.id,
						name: selectedClass.name,
						teacher: teacher,
						students: students,
						followups: followups
					};
					return result;
				}
			);
		}
		return allClasses;
	},

	addClass: async (classInfo) => {
		const ID = await db('classes').insert(classInfo);

		return { newClassID: ID[0] };
	},

	updateClass: async (id, updatedClass) => {
		const updateCount = await db('classes')
			.where({ id })
			.update(updatedClass);
		return updateCount;
	},

	deleteClass: async (id) => {
		const deleteCount = await db('classes')
			.where({ id })
			.del();
		return deleteCount;
	}
};
