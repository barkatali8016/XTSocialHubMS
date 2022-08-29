const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    postId: { type: String },
    commentText: { type: String, require: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    postsInfo: { type: Schema.Types.ObjectId, ref: "posts", require: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", CommentsSchema);
