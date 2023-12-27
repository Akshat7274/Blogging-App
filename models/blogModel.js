const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Title can not be empty"],
    },
    description: {
      type: String,
      required: [true, "Description can not be empty"],
    },
    image: {
      type: String,
      required: [true, "Image can not be empty"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "User Id can not be empty"],
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;