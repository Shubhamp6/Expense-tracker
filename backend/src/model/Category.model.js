const mongoose = require("mongoose");

const Categoryschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator_id: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  icon: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Categories", Categoryschema);
