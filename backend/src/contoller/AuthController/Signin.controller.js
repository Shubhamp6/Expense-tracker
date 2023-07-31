const Users = require("../../model/User.model");
const { body } = require("express-validator");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const _lang = require("../../utils/lang");
const TokenServices = require("../../services/Token.service");
const UserModel = require("../../model/User.model");
const { default: mongoose } = require("mongoose");
const { generateValidationError } = require("../../utils/common.helper");
const { comparePass } = require("../../utils/passEncDec.helper");

const SignInController = [
	body("email")
		.notEmpty({ ignore_whitespace: true })
		.withMessage("email_required")
		.bail()
		.isEmail()
		.withMessage("email_invalid")
		.trim()
		.escape(),

	body("password")
		.notEmpty({ ignore_whitespace: true })
		.withMessage("password_required")
		.trim()
		.escape(),

	PayloadValidatorMiddleware,

	async (req, res, next) =>
	{
		try
		{
			const { email, password } = req.body;
			const user = await Users.findOne({ email: email.toLowerCase() ,deleted:false});
			if (!user)
			{
				return apiResponseHelper.validationErrorWithData(
					res,
					_lang('validation_error', req.client_lang),
					generateValidationError(_lang('user_not_found', req.client_lang), 'email')
				)
			} else
			{
				if (!comparePass(password, user['password']))
				{
					return apiResponseHelper.validationErrorWithData(
						res,
						_lang('validation_error', req.client_lang),
						generateValidationError(_lang('password_wrong', req.client_lang), 'password')
					)
				}

				const userData = user._doc
				delete userData['password']

				const refreshToken = new TokenServices('refresh').generate({ _id: userData._id })
				const accessToken = new TokenServices('access').generate({ _id: userData._id })

				await UserModel.updateOne({ _id: mongoose.Types.ObjectId(userData._id) }, { accessToken, refreshToken })

				return apiResponseHelper.successResponseWithData(res, _lang('signed_in'), { ...userData, accessToken, refreshToken })

			}
		} catch (e)
		{
			return apiResponseHelper.errorResponse(res, e.message)
		}
	},
];

module.exports = SignInController;
