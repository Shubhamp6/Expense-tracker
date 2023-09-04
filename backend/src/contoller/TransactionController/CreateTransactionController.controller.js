const apiResponseHelper = require("../../utils/apiResponse.helper");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const { body, matchedData } = require("express-validator");
const _lang = require("../../utils/lang");
const TransactionModel = require("../../model/Transaction.model");
const mongoose = require("mongoose");

const CreateTransactionController = [
  body("description")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("name of transaction is required!")
    .trim()
    .escape(),
  body("amount")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("amount of transaction is required!")
    .trim()
    .escape(),
  body("category_id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("catergory id of transaction is required!")
    .trim()
    .escape(),
  body("category_name")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("catergory name of transaction is required!")
    .trim()
    .escape(),
  body("category_icon")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("catergory icon of transaction is required!")
    .trim()
    .escape(),

  PayloadValidatorMiddleware,
  async (req, res) => {
    try {
      const { amount, description } = req.body;
      const category = {
        id: mongoose.Types.ObjectId(req.body.category_id),
        name: req.body.category_name,
        icon: req.body.category_icon,
      };
      const data = {};
      data["amount"] = amount;
      data["description"] = description;
      data["category"] = category;
      data["creator_id"] = mongoose.Types.ObjectId(req.user._id);
      await TransactionModel.create(data);
      return apiResponseHelper.successResponse(res, "transaction added");
    } catch (error) {
      return apiResponseHelper.errorResponse(res, _lang("server_error"));
    }
  },
];

module.exports = CreateTransactionController;
