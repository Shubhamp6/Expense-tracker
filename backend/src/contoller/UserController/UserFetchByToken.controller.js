const User = require("../../model/User.model");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const _lang = require("../../utils/lang");

const UserFetchByTokenController = [
	async (req, res) => {
		try {
			const userData = { ...req.user }
			delete userData['password']
			delete userData['accessToken']
			delete userData['refreshToken']
			if (userData.parentID && Array.isArray(userData.parentID) && userData.parentID[0]) {
				const requestedParent = await User.findById(userData.parentID[0])
				userData['parentID'] = [{
					_id: requestedParent._id,
					name: requestedParent.name
				}]
			}
			return apiResponseHelper.successResponseWithData(res, 'user info fetched', userData)
		
		} catch (e) {
			return apiResponseHelper.errorResponse(res, _lang('server_error'))
		}

	}
		
];

module.exports = UserFetchByTokenController;
