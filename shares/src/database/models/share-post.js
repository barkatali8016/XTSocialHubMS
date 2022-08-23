const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SharePostSchema = new Schema(
  {
    postId: { type: String, require: true },
    share_details: [{user_id: String, sharedTime: Date}],
    share_count: {type: Number, require: true}
  },
);

module.exports = mongoose.model('shares', SharePostSchema);
