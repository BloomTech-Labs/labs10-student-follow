const db = require('../../config/dbConfig');

module.exports = {
	getAll: async () => {
		const allQuestions = await db('questions').select(
			'id',
			'review_text',
			'question',
			'wrong_answer_1',
			'wrong_answer_2',
			'wrong_answer_3',
			'correct_answer'
		);

		return allQuestions;
	},

	getQuestion: async (id) => {
		const selectedQuestion = await db('questions')
			.select(
				'id',
				'review_text',
				'question',
				'wrong_answer_1',
				'wrong_answer_2',
				'wrong_answer_3',
				'correct_answer'
			)
			.where({ id })
			.first();

		return selectedQuestion;
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
