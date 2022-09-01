const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId },
    commentText: { type: String, require: true },
    userId: { type: Schema.Types.ObjectId },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", CommentsSchema);
