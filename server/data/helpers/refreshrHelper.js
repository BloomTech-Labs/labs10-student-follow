const db = require('../../config/dbConfig');

module.exports = {
	getRefreshrs: async (id) => {
		const allRefreshrs = await db('followups').select('id', 'date', 'question');
		const selectedRefreshr = await db('followups')
			.select('id', 'date', 'question')
			.where({ id })
			.first();

		if (id) {
			return selectedRefreshr;
		}
		return allRefreshrs;
	},
	addRefreshr: async (refreshr) => {
		const ID = await db('followups').insert(refreshr);

		return { newRefreshrID: ID[0] };
	},

	updateRefreshr: async (id, refreshr) => {
		const updateCount = await db('followups')
			.where({ id })
			.update(refreshr);
		return updateCount;
	},

	deleteRefreshr: async (id) => {
		const deleteCount = await db('followups')
			.where({ id })
			.del();
		return deleteCount;
	}
};
