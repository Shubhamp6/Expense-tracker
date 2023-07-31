const apiResponseHelper = require("../../utils/apiResponse.helper");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const { body, matchedData } = require("express-validator");
const _lang = require("../../utils/lang");
const { default: mongoose } = require("mongoose");
const TransactionModel = require("../../model/Transaction.model");
const DeleteTransactionController = [
  body("id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("id is required!")
    .trim()
    .escape(),
  PayloadValidatorMiddleware,
  async (req, res) => {
    try {
      const condition = {};
      const { id } = matchedData(req);
      condition["_id"] = id;
      condition["creator_id"] = mongoose.Types.ObjectId(req.user._id);
      await TransactionModel.findOneAndDelete(condition);

      return apiResponseHelper.successResponse(res, "category deleted");
    } catch (error) {
      return apiResponseHelper.errorResponse(res, _lang("server_error"));
    }
  },
];

module.exports = DeleteTransactionController;
