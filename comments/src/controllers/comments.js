const { CommentsRepository } = require("../database");

const { FormatData, APIError } = require("../utils");

class CommentsController {
  constructor() {
    this.repository = new CommentsRepository();
  }

  async comment( postId, commentText, userId ) {
    try {
      const createdComment = await this.repository.CreateComments(
        postId,
        commentText,
        userId,
      );
      if (!createdComment) {
        return {};
      }
      return FormatData(createdComment);
    } catch (error) {
      throw error;
    }
  }

  async getComments({ postId }) {
    try {
      const receivedComments = await this.repository.GetComments({ postId });
      if (!receivedComments) {
        return {};
      }
      console.log(receivedComments);
      return FormatData({ receivedComments });
    } catch (error) {
      throw error;
    }
  }

  async editComment(commentId, commentText) {
    try {
      const editedComment = await this.repository.EditComment(
        commentId,
        commentText
      );
      if (!editedComment) {
        return {};
      }
      return FormatData(editedComment);
    } catch (error) {
      throw error;
    }
  }

  async deletedComment({ commentId }) {
    try {
      const deletedComment = await this.repository.DeletedComment({
        commentId,
      });
      if (!deletedComment) {
        return {};
      }
      return FormatData(deletedComment);
    } catch (error) {
      return error.message;
    }
  }
}
module.exports = CommentsController;
