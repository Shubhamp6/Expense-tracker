const mongoose = require("mongoose");

const Transactionschema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      unique: true,
      required: true,
    },
    creator_id: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    category: {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "categories",
        require: true,
      },
      name: {
        type: String,
        require: true,
      },
      icon: {
        type: String,
        require: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transactions", Transactionschema);
