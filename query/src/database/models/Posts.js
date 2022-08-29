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
    interactionCount: { type: Object },
    approxReadingTime: { type: Number, require: true },
    schedule: { type: Object },
    isAudited: { type: Boolean, default: false },
    comments: [{ type: Schema.Types.ObjectId, ref: "comments", require: true }],
    isDeleted: { type: Boolean, default: false },
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

const postDBModel = model("post", postsSchema);
module.exports = postDBModel;
