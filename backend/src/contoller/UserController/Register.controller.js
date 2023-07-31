const Users = require("../../model/User.model");
const { body, matchedData } = require("express-validator");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const UserModel = require("../../model/User.model");
const _lang = require("../../utils/lang");
const { USER_ROLES } = require("../../utils/constants/common.constants");

const RegisterController = [
	body("name")
		.notEmpty({ ignore_whitespace: true })
		.withMessage("name_required")
		.trim()
		.escape(),
	body("email")
		.notEmpty({ ignore_whitespace: true })
		.withMessage("email_required")
		.bail()
		.isEmail()
		.withMessage("email_invalid!")
		.custom(async (email) => {
			const user = await UserModel.findOne({ email })
			if (user) {
				return Promise.reject('email_exist')
			}
			return Promise.resolve()
		})
		.trim()
		.escape(),


	body("password")
		.notEmpty({ ignore_whitespace: true })
		.withMessage("password_required!")
		.trim()
		.escape(),
	PayloadValidatorMiddleware,

	async (req, res, next) => {
		try {
			const data = matchedData(req);
			const response = await Users.create(data);
			return apiResponseHelper.successResponseWithData(res, _lang('user_generated'))
		} catch (e) {
			console.log(e)
			return apiResponseHelper.errorResponse(res, _lang('server_error'))
		}

	},
];

module.exports = RegisterController;