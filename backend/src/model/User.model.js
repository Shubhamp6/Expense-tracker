const mongoose = require("mongoose");
const { USER_ROLES } = require("../utils/constants/common.constants");

const { hashPass } = require("../utils/passEncDec.helper");
const Userschema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Your Name"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  refreshToken: String,
  accessToken: String,
});

//hash the password

Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = hashPass(this.password);
});

module.exports = mongoose.model("Users", Userschema);
