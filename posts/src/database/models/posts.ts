import { Schema, model } from "mongoose";

const postsSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    content: { type: String },
    imageURL: { type: String },
    postTitle: { type: String },
    userId: { type: Schema.Types.ObjectId },
    approxReadingTime: { type: Number, require: true },
    schedule: { type: Object },
    isDeleted: { type: Boolean, default: false },
    isDisabledInteractions: { type: Boolean, default: false },
    // sharePostId:{ type: Schema.Types.ObjectId },
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

export const postDBModel = model("post", postsSchema);

// localhost:5000/api/posts
// posts/images/xtsociallogo.png
