import { Schema, model } from "mongoose";

const userInfoSchema = new Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    _id: { type: Object }
});

const postsSchema = new Schema({
    content: { type: String },
    imageURL: { type: String },
    userInformation: { type: Schema.Types.ObjectId, ref: 'userInfoModel', require: true },
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

export const postModel = model('post', postsSchema);
export const userInfoModel = model('user', userInfoSchema);