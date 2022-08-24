const { CommentsModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class CommentsRepository {
  async CreateComments({ postId, commentText, authorName }) {
    try {
      if (!commentText) {
        return null;
      }
      const comment = new CommentsModel({
        postId, 
        commentText, 
        authorName
      });
      const commentResult = await comment.save();
      return commentResult;
    } catch (err) {
      throw err;
    }
  }

  async GetComments({ postId}) {
    try {
      if (!postId) {
        return null;
      }
      // const comment = new CommentsModel();
      const commentResult = await CommentsModel.find({"postId":postId});
      return commentResult;
    } catch (err) {
      throw err;
    }
  }

  async UpdateComment({ commentId, commentText }) {
    try {
      if(!commentId){
        return null;
      }
      const newComment = await CommentsModel.findOneAndUpdate({ _id: commentId },{ commentText },{ new: true })
      if(newComment){
        return newComment
      }else{
        throw new Error("Comment Id is invalid")
      }
    } catch (error) {
      return error.message;
    }
  };

  async DeletedComment({ commentId }){
    try {
      if(!commentId){
        return null;
      };
      const deletedComment = await CommentsModel.findOneAndDelete({_id: commentId });
      if(deletedComment){
        return deletedComment
      }else{
        throw new Error("Comment Id is invalid")
      }
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = CommentsRepository;
