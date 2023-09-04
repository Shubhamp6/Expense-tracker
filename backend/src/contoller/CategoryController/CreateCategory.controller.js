const apiResponseHelper = require("../../utils/apiResponse.helper");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const { body, matchedData } = require("express-validator");
const _lang = require("../../utils/lang");
const CategoryModel = require("../../model/Category.model");
const UserModel = require("../../model/User.model");
const mongoose = require("mongoose");

const CreateCategoryController = [
  body("name")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("name of category is required!")
    .trim()
    .escape(),

  body("icon")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("icon of category is required!")
    .trim()
    .escape(),

  PayloadValidatorMiddleware,
  async (req, res) => {
    try {
      const data = {};
      data["name"] = req.body.name;
      data["icon"] = req.body.icon;
      data["creator_id"] = mongoose.Types.ObjectId(req.user._id);
      console.log(data);
      await CategoryModel.create(data);
      return apiResponseHelper.successResponse(res, "category added");
    } catch (error) {
      console.log(error);
      return apiResponseHelper.errorResponse(res, _lang("server_error"));
    }
  },
];

module.exports = CreateCategoryController;
