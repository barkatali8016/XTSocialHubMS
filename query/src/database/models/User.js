const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    // password: { type: String, require: true },
    // salt: String,
    phone: { type: String, require: true },
    address: { type: String, require: false },
    // posts: [{ type: Schema.Types.ObjectId, ref: "posts", require: true }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("users", UserSchema);
