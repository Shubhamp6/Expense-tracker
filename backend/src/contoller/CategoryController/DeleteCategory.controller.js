const apiResponseHelper = require("../../utils/apiResponse.helper");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const { body, matchedData } = require("express-validator");
const _lang = require("../../utils/lang");
const { default: mongoose } = require("mongoose");
const CategoryModel = require("../../model/Category.model");
const DeleteCategoryController = [
  body("id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("id is required!")
    .trim()
    .escape(),
  PayloadValidatorMiddleware,
  async (req, res) => {
    try {
      const { id } = matchedData(req);
      const condition = {};
      condition["_id"] = id;
      condition["creator_id"] = mongoose.Types.ObjectId(req.user._id);

      const deletedCategory = await CategoryModel.findOneAndDelete(condition);

      if (deletedCategory)
        return apiResponseHelper.successResponse(res, "category deleted");
      return apiResponseHelper.notFoundResponse(res, "category not found");
    } catch (error) {
      return apiResponseHelper.errorResponse(res, _lang("server_error"));
    }
  },
];

module.exports = DeleteCategoryController;
