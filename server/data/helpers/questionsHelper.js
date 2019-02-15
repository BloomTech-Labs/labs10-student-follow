const db = require('../../config/dbConfig');

module.exports = {
	getQuestions: async (id) => {
		const allQuestions = await db('questions');
		const selectedQuestion = await db('questions')
			.select(
				'questions.id',
				'questions.review_text',
				'questions.question',
				'questions.wrong_answer_1',
				'questions.wrong_answer_2',
				'questions.wrong_answer_3',
				'questions.correct_answer'
			)
			.where({ id })
			.first();

		if (id) {
			return selectedQuestion;
		}
		return allQuestions;
	},
	addQuestion: async (question) => {
		const ID = await db('questions').insert(question);

		return { newQuestionID: ID[0] };
	},

	updateQuestion: async (id, question) => {
		const updateCount = await db('questions')
			.where({ id })
			.update(question);
		return updateCount;
	},

	deleteQuestion: async (id) => {
		const deleteCount = await db('questions')
			.where({ id })
			.del();
		return deleteCount;
	}
};
