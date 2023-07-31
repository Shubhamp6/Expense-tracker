
const mongoose = require('mongoose')
const UserModel = require('../model/User.model.js')
const apiResponseHelper = require('../utils/apiResponse.helper.js')
const { USER_ROLES } = require('../utils/constants/common.constants.js')
const _lang = require('../utils/lang/index.js')


//use of this middle ware is to check requested user by its usercode is allowed to perticuler client or not

//----logic-----

// 1.check requested user data by token
// 2. fetch user by its usercode
// 3. if fetched user's role is less than requested user then its not allowed

const userVerifier = async (req, res, next) =>
{

    try
    {

        const { userId } = (req.method && req.method.toLowerCase() == 'get' ? (req.query || req.params) : req.body)

        if (!userId || userId == req.user._id)
        {
            req.requestedUser = req.user

        } else
        {
            const requestedUser = await UserModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
            if (!requestedUser)
            {
                return apiResponseHelper.notFoundResponse('user_not_found', req.client_lang)
            }            
            if (!((requestedUser.parentID && Array.isArray(requestedUser.parentID) &&requestedUser.parentID.includes(req.user._id)) || req.user.role == USER_ROLES.hr|| req.user.role == USER_ROLES.admin)) {
                return apiResponseHelper.forbiddenResponse('not_allowed', req.client_lang)
            }

            if (requestedUser._doc['password'])
            {
                delete requestedUser._doc['password']
            }
            req.requestedUser = requestedUser._doc
        }
        next()

    } catch (error)
    {
        console.log(error)
        // Access Denied        
        return apiResponseHelper.errorResponse(res, _lang('server_error', req.client_lang));
    }
}
module.exports = userVerifier