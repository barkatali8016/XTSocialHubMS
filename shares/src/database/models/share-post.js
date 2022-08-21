const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SharePostSchema = new Schema(
  {
    postId: { type: String, require: true },
    userId: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('sharePost', SharePostSchema);
