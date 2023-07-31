const Users = require("../../model/User.model");
const { body, matchedData } = require("express-validator");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const _lang = require("../../utils/lang");

const UserModel = require("../../model/User.model");
const { default: mongoose } = require("mongoose");
const { generateValidationError } = require("../../utils/common.helper");
const { comparePass ,hashPass} = require("../../utils/passEncDec.helper");



const ResetPasswordController = [

    body('current_pass')
        .notEmpty({ ignore_whitespace: true })
        .withMessage('current_pass_required')
        .trim()
        .escape(),
    body('new_pass')
        .notEmpty({ ignore_whitespace: true })
        .withMessage('new_pass_required')
        .trim()
        .escape()
    ,
    async (req, res) => {
        try {
            const { new_pass, current_pass } = matchedData(req)
// console.log(current_pass,req.user)
            if (comparePass(current_pass, req.user.password)) {
                await UserModel.updateOne({ _id: mongoose.Types.ObjectId(req.user._id) }, { password: hashPass(new_pass) })
                return apiResponseHelper.successResponse(res, _lang('password_changed'))
            } else {
                return apiResponseHelper.validationErrorWithData(res, _lang('validation_error'), generateValidationError(_lang('password_wrong'), 'current_pass'))
            }


        } catch (error) {
            // Access Denied      
            console.log(error.stack)  
            return apiResponseHelper.errorResponse(res, error.message);
        }



    }]
module.exports = ResetPasswordController
