const { CommentsRepository } = require("../database");

const {
  FormatData,
  APIError
} = require("../utils");

class CommentsController {
  constructor() {
    this.repository = new CommentsRepository();
  }

  async comment({ postId, commentText, authorName }) {
    try {
      const createdComment = await this.repository.CreateComments({ postId, 
        commentText, 
        authorName 
      });
      if (!createdComment) {
        return {};
      }
      return FormatData({ id: createdComment._id , commentText: createdComment.commentText, authorName: createdComment.authorName, createdAt: createdComment.createdAt});
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

  async editComment(commentId, comment) {
    try {
      const editedComment = await this.repository.EditComment(commentId, comment);
      if (!editedComment) {
        return {};
      }
      return FormatData({ id: editedComment._id , commentText: editedComment.commentText, authorName: editedComment.authorName, updatedAt: editedComment.updatedAt});
    } catch (error) {
      throw error;
    }
  }

  async deletedComment({ commentId }){
    try {
      const deletedComment = await this.repository.DeletedComment({ commentId });
      if(!deletedComment){
        return {};
      };
      return FormatData({ id: deletedComment._id , commentText: deletedComment.commentText, authorName: deletedComment.authorName, createdAt:deletedComment.createdAt, updatedAt: deletedComment.updatedAt});
    } catch (error) {
      return error.message;
    }
  }
}
module.exports = CommentsController;
