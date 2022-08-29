import { Schema, model } from "mongoose";

const postsSchema = new Schema(
  {
    content: { type: String },
    imageURL: { type: String },
    userId: { type: Schema.Types.ObjectId },
    interactionCount: { type: Object },
    approxReadingTime: { type: Number, require: true },
    schedule: { type: Object },
    isAudited: { type: Boolean, default: false },
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
