const { CommentModel, PostModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class CommentRepository {
  async CreateComment(commentInputs) {
    try {
      const comment = new CommentModel(commentInputs);
      const commentResult = await comment.save();
      await PostModel.findOneAndUpdate(
        { _id: commentInputs.postId },
        { $push: { comments: commentResult._id } }
      );
      return commentResult;
    } catch (err) {
      throw err;
    }
  }

  async UpdateComment(commentInputs) {
    try {
      const commentResult = await CommentModel.findByIdAndUpdate(
        { _id: commentInputs._id },
        { commentText: commentInputs.commentText },
        { returnOriginal: false }
      );
      return commentResult;
    } catch (err) {
      throw err;
    }
  }

  // async FindUser({ email }) {
  //   try {
  //     const user = await UserModel.findOne({ email });
  //     return user;
  //   } catch (error) {
  //     throw new APIError(
  //       "API Error",
  //       STATUS_CODES.INTERNAL_ERROR,
  //       "Unable to Create Customer"
  //     );
  //   }
  // }
  // async FindUserById({ _id }) {
  //   try {
  //     const user = await UserModel.findOne({ _id });
  //     return user;
  //   } catch (error) {
  //     throw new APIError(
  //       "API Error",
  //       STATUS_CODES.INTERNAL_ERROR,
  //       "Unable to Create Customer"
  //     );
  //   }
  // }
}

module.exports = CommentRepository;
