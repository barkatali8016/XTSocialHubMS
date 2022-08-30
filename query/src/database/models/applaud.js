const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplaudSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    postId: { type: Schema.Types.ObjectId, ref: 'posts', require: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      require: true,
    },
    applaudKey: { type: Number, require: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('applauds', ApplaudSchema);
