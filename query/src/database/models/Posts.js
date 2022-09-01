const { Schema, model } = require("mongoose");
const postsSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    content: { type: String },
    imageURL: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    approxReadingTime: { type: Number, require: true },
    schedule: { type: Object },
    isDeleted: { type: Boolean, default: false },
    isDisabledInteractions: { type: Boolean, default: false },
    comments: [{ type: Schema.Types.ObjectId, ref: "comments", require: true }],
    applauds: [{ type: Schema.Types.ObjectId, ref: "applauds", require: true }],
    shares: {
      type: Schema.Types.ObjectId,
      ref: "shares",
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const postDBModel = model("posts", postsSchema);
module.exports = postDBModel;
