const { default: mongoose } = require("mongoose");
const User = require("../../model/User.model");
const apiResponseHelper = require("../../utils/apiResponse.helper");

const UserProfileController = [
  async (req, res) => {
    try {
      const id = mongoose.Types.ObjectId(req.requestedUser._id);
      console.log(id);
      const result = await User.findById(id, {
        password: 0,
        access_token: 0,
        refresh_token: 0,
      });
      return apiResponseHelper.successResponseWithData(
        res,
        "user for profile is found!",
        result
      );
    } catch (error) {
      console.log(error.message);
      return apiResponseHelper.errorResponse(res, (msg = "Server Error"));
    }
  },
];

module.exports = UserProfileController;
