import { Schema, model } from "mongoose";

const postsSchema = new Schema({
    content: { type: String },
    imageURL: { type: String },
    userInformation: {
        firstName: { type: String },
        lastName: { type: String },
        userId: { type: String }
    },
    interactionCount: { type: Object },
    approxReadingTime: { type: Number, require: true },
    schedule: { type: Object },
    isAudited: { type: Boolean, default: false }
},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
            },
        },
        timestamps: true,
    });

export const postDBModel = model('post', postsSchema);