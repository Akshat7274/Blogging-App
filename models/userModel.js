const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username can not be empty"],
    },
    email: {
      type: String,
      required: [true, "Email can not be empty"],
    },
    password: {
      type: String,
      required: [true, "Password can not be empty"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;