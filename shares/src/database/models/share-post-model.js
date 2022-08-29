const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SharePostSchema = new Schema(
  {
    postId: { type: String, require: true },
    shareDetails: [{ userId: String, sharedTime: Date }],
    shareCount: { type: Number, require: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('shares', SharePostSchema);
