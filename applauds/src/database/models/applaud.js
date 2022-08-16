const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplaudSchema = new Schema(
  {
    postId: { type: String, require: true },
    userId: { type: String, require: true },
    applaud: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('applauds', ApplaudSchema);
