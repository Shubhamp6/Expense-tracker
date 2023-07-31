

const Users = require("../../model/User.model");
const { body, matchedData } = require("express-validator");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const UserModel = require("../../model/User.model");
const _lang = require("../../utils/lang");
const { USER_ROLES } = require("../../utils/constants/common.constants");
const { default: mongoose } = require("mongoose");

const UpdateUserController = [
	body("id")
		.notEmpty({ ignore_whitespace: true })
		.withMessage("id_required")
		.trim()
		.escape(),
	body("name")
		.optional({ nullable: true })
		.notEmpty({ ignore_whitespace: true })
		.withMessage("name_required")
		.trim()
		.escape(),	

	PayloadValidatorMiddleware,

	async (req, res, next) => {
		try {
			const { id, ...data } = matchedData(req);
			const user = await Users.updateOne({ _id: mongoose.Types.ObjectId(id) }, data);
			return apiResponseHelper.successResponseWithData(res, 'user_generated')
		} catch (e) {
			console.log(e)
			return apiResponseHelper.errorResponse(res, _lang('server_error'))
		}

	},
];

module.exports = UpdateUserController;