const responseStatus = require('../config/responseStatusConfig')

module.exports = {
    emptyCheck: (req, res, next) => {
		const { body } = req;
		for (key in body) {
			if (body[key] === '') {
				next(responseStatus.badRequest);
			}
		}
		next();
    },
    whitespaceCheck: (req, res, next) => {
		const { body } = req;
		for (key in body) {
			if (body[key].match(/\s/g)) {
				res
					.status(responseStatus.badRequest)
					.json({ message: 'Input fields cannot contain whitespace.' })
					next();
			}
		}
		next();
	}
}