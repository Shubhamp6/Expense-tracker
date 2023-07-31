const { validationResult } = require("express-validator");
const apiResponseHelper = require("../utils/apiResponse.helper");
const _lang = require("../utils/lang/index");

const PayloadValidatorMiddleware = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorsArray = errors.array();

		for (let i = 0; i < errorsArray.length; i++) {
			errorsArray[i]["msg"] = _lang(errorsArray[i]["msg"], req.client_lang);
		}

		return apiResponseHelper.validationErrorWithData(
			res,
			_lang("validation_error"),
			errorsArray
		);
	}
	next();
};

module.exports = PayloadValidatorMiddleware;
