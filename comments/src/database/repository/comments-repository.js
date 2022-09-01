const { CommentsModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class CommentsRepository {
  async CreateComments( postId, commentText, userId ) {
    try {
      if (!commentText) {
        return null;
      }
      console.log("postId, commentText, userId============= ",postId, commentText, userId);
      const comment = new CommentsModel({
        postId,
        commentText,
        userId,
      });
      const commentResult = await comment.save();
      return commentResult;
    } catch (err) {
      throw err;
    }
  }

  async GetComments({ postId }) {
    try {
      if (!postId) {
        return null;
      }
      const commentResult = await CommentsModel.find({ postId: postId });
      return commentResult;
    } catch (err) {
      throw err;
    }
  }

  async EditComment(commentId, commentText) {
    try {
      if (!commentId) {
        return null;
      }
      const editedComment = await CommentsModel.findByIdAndUpdate(
        { _id: commentId },
        { commentText: commentText },
        { returnOriginal: false }
      );
      return editedComment;
    } catch (err) {
      throw err;
    }
  }

  async DeletedComment({ commentId }) {
    try {
      if (!commentId) {
        return null;
      }
      const deletedComment = await CommentsModel.findByIdAndUpdate(
        { _id: commentId },
        { isDeleted: true },
        { returnOriginal: false }
      );
      if (deletedComment) {
        return deletedComment;
      } else {
        throw new Error("Comment Id is invalid");
      }
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = CommentsRepository;
