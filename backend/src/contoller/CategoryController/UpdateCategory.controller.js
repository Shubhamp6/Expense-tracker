const apiResponseHelper = require("../../utils/apiResponse.helper");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const { query, body, matchedData } = require("express-validator");
const _lang = require("../../utils/lang");
const { default: mongoose } = require("mongoose");
const CategoryModel = require("../../model/Category.model");

const UpdateCategoryController = [
  query("id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("id of category is required!")
    .trim()
    .escape(),
  body("name")
    .optional({ nullable: true })
    .notEmpty({ ignore_whitespace: true })
    .withMessage("name of category is required!")
    .trim()
    .escape(),
  body("icon")
    .optional({ nullable: true })
    .notEmpty({ ignore_whitespace: true })
    .withMessage("address of category is required!")
    .trim()
    .escape(),

  PayloadValidatorMiddleware,
  async (req, res) => {
    try {
      const { id, ...data } = matchedData(req);
      const condition = {};
      condition["_id"] = mongoose.Types.ObjectId(id);
      condition["creator_id"] = mongoose.Types.ObjectId(req.user._id);
      await CategoryModel.updateOne(condition, data);
      return apiResponseHelper.successResponse(res, "category updated");
    } catch (error) {
      return apiResponseHelper.errorResponse(res, _lang("server_error"));
    }
  },
];

module.exports = UpdateCategoryController;
