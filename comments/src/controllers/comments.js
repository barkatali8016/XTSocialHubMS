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
      console.log("createdComment object "+createdComment);
      if (!createdComment) {
        return {};
      }
      console.log(createdComment);
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

  async editComment({commentId, comment }) {
    try {
      const editedComment = await this.repository.EditComment({ commentId, comment });
      if (!editedComment) {
        return {};
      }
      console.log(editedComment);
      return FormatData({ editedComment });
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
      console.log(deletedComment);
      return FormatData({ deletedComment });
    } catch (error) {
      return error.message;
    }
  }
}
module.exports = CommentsController;
