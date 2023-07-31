const { body, matchedData } = require("express-validator");
const User = require("../../model/User.model");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const UserModel = require("../../model/User.model");
const { default: mongoose } = require("mongoose");
const _lang = require("../../utils/lang");

const DeleteUserController = [
	body("id")
		.notEmpty({ ignore_whitespace: true })
		.withMessage("id_required")
		.trim()
		.escape(),
	PayloadValidatorMiddleware,
	async (req, res) => {
		try {
			const { id } = matchedData(req)
			await UserModel.updateOne({ _id: mongoose.Types.ObjectId(id) }, { deleted: true })
			return apiResponseHelper.successResponse(
				res,
				(msg = _lang('user_deleted'))
				
			);
		} catch (error) {
			console.log(error.message)
			return apiResponseHelper.errorResponse(res, msg = "Error in deleting user")
		}
	},
];

module.exports = DeleteUserController;
