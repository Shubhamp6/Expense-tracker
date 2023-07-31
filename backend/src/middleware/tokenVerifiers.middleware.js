const UserModel = require('../model/User.model.js');
const TokenServices = require('../services/Token.service.js');
const apiResponseHelper = require('../utils/apiResponse.helper.js');
const { jwtErorr } = require('../utils/common.helper.js');
const _lang = require('../utils/lang/index.js')


const tokenVerifier = async (req, res, next) =>
{
    try
    {

        const Bearer = req.header('Authorization');
        const token = Bearer.replace("Bearer ", "")
        const verified = new TokenServices('access').verify(token);

        if (verified)
        {
            const user = await UserModel.findById(verified.payload._id)

            if ((!user || user.deleted === true || user.accessToken !== token))
            {
                return apiResponseHelper.forbiddenResponse(
                    res,
                    _lang('token_not_valid', req.client_lang)
                )
            }
            // if (user._doc && user._doc['password'])
            //     delete user._doc['password']
            req.user = user._doc
            next()
        } else
        {
            // Access Denied
            return apiResponseHelper.unauthorizedResponse(
                res,
                _lang('token_not_found', req.client_lang)
            )
        }

    } catch (error)
    {
        console.log(error);
        // Access Denied        
        return apiResponseHelper.unauthorizedResponse(res, jwtErorr(error.message, req));
    }
}
module.exports = tokenVerifier