const db = require('../../config/dbConfig');

module.exports = {
	getAll: async () => {
		const allClasses = await db('classes').select('id', 'name');
		return allClasses;
	},

	getClass: async (id) => {
		const selectedClass = await db('classes')
			.select('id', 'name')
			.where({ id })
			.first();

		const teacher = await db('teachers')
			.select('teachers.firstname', 'teachers.lastname', 'teachers.email')
			.join('teachers_classes', 'teachers.id', 'teachers_classes.teacher_id')
			.where('class_id', id);

		const students = await db('students')
			.select('students.firstname', 'students.lastname', 'students.email')
			.join('students_classes', 'students.id', 'students_classes.student_id')
			.where('class_id', id);

		const refreshrs = await db('refreshrs')
			.select(
				'refreshrs.id',
				'refreshrs.date',
				'questions.review_text',
				'questions.question',
				'questions.wrong_answer_1',
				'questions.wrong_answer_2',
				'questions.wrong_answer_3',
				'questions.correct_answer'
			)
			.join(
				'questions_refreshrs',
				'refreshrs.id',
				'questions_refreshrs.refreshr_id'
			)
			.join('questions', 'questions.id', 'questions_refreshrs.question_id')
			.join('classes', 'refreshrs.class_id', 'classes.id')
			.where('class_id', id);

		return Promise.all([selectedClass, teacher, students, refreshrs]).then(
			(response) => {
				let [selectedClass, teacher, students, refreshrs] = response;
				let result = {
					id: selectedClass.id,
					name: selectedClass.name,
					teacher: teacher,
					students: students,
					refreshrs: {
						...refreshrs,
						questions: {
							review_text: refreshrs.review_text,
							question: refreshrs.question,
							wrong_answer_1: refreshrs.wrong_answer_1,
							wrong_answer_2: refreshrs.wrong_answer_2,
							wrong_answer_3: refreshrs.wrong_answer_3,
							correct_answer: refreshrs.correct_answer
						}
					}
				};
				return result;
			}
		);
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
