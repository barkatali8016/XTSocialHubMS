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
      console.log(createdComment);
      return FormatData({ id: createdComment._id });
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

  async updateComment({ commentId,updatedComment }) {
    try {
      const newComment = await this.repository.UpdatedComment({ commentId,updatedComment });
      if(!newComment){
        return {};
      };
      console.log(newComment);
      return FormatData({ newComment });
    } catch (error) {
      return error.message;
    }
  };

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
