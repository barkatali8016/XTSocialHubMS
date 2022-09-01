const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SharePostSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    postId: { type: Schema.Types.ObjectId, ref: "posts", require: true },
    shareDetails: [{
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        require: true,
      }, sharedTime: Date,
    }],
    shareCount: { type: Number, require: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("shares", SharePostSchema);
