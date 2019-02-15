const db = require('../../config/dbConfig');

module.exports = {
	getAll: async () => {
		const allRefreshrs = await db('refreshrs').select('id', 'date');

		return allRefreshrs;
	},

	getRefreshr: async (id) => {
		const selectedRefreshr = await db('refreshrs')
			.select('refreshrs.id', 'refreshrs.date')
			.where({ id })
			.first();

		const questions = await db('questions')
			.select(
				'questions.review_text',
				'questions.question',
				'questions.wrong_answer_1',
				'questions.wrong_answer_2',
				'questions.wrong_answer_3',
				'questions.correct_answer'
			)
			.join(
				'questions_refreshrs',
				'question.id',
				'questions_refreshrs.question_id'
			)
			.where('questions_refreshrs.refreshr_id', id);

		return Promise.all([selectedRefreshr, questions]).then((response) => {
			let [selectedRefreshr, questions] = response;
			let result = {
				id: selectedRefreshr.id,
				date: selectedRefreshr.date,
				questions: questions
			};
			return result;
		});
	},
	addRefreshr: async (refreshr) => {
		const ID = await db('refreshrs').insert(refreshr);

		return { newRefreshrID: ID[0] };
	},

	updateRefreshr: async (id, refreshr) => {
		const updateCount = await db('refreshrs')
			.where({ id })
			.update(refreshr);
		return updateCount;
	},

	deleteRefreshr: async (id) => {
		const deleteCount = await db('refreshrs')
			.where({ id })
			.del();
		return deleteCount;
	}
};
