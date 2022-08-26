const { CommentsController } = require("../controllers");
const CommentsAuth = require("./middlewares/auth");
const { STATUS_CODES } = require("../utils/app-errors");
const { randomBytes } = require("crypto");
const { PublishMessage } = require("../utils");
const { POST_BINDING_KEY } = require("../config");

module.exports = async (app, channel) => {
  const commentsController = new CommentsController();
  // ADD COMMENT
  app.post('/api/comments/:postId/addComment',CommentsAuth, async (req, res, next) => {
    try {
      console.log(req.body, req.user);
      const postId = req.params.postId;
      // const commentId = randomBytes(4).toString("hex");
      const { commentText, authorName } = req.body;
      console.log(postId, commentText, authorName );

      const { data } = await commentsController.comment({
        postId, 
        commentText, 
        authorName, 
      });
      if (data) {
        PublishMessage(
          channel,
          POST_BINDING_KEY,
          JSON.stringify({ event: "COMMENT_ADDED", data: { ...data } })
        );
        return res.status(STATUS_CODES.COMMENT_CREATED).json(data);
      } else {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'Something went wrong' });
      }
    } catch (error) {
      throw error;
    }
  });

  app.get('/api/comments/:postId/getComments',CommentsAuth, async (req, res, next) => {
    try {
      console.log(req.user);
      const postId = req.params.postId;
      console.log(postId );

      const { data } = await commentsController.getComments({
        postId
      });
      if (data) {
        return res.status(STATUS_CODES.OK).json(data);
      } else {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'Something went wrong' });
      }
    } catch (error) {
      throw error;
    }
  });

  app.put('/api/comments/editComment/',CommentsAuth, async (req, res, next) => {
    try {
      const {commentId} = req.body;
      const {commentText} = req.body;
      console.log("commenttextnId",commentText, commentId );

      const { data } = await commentsController.editComment({
        commentId, commentText
      });
      if (data) {
        PublishMessage(
          channel,
          POST_BINDING_KEY,
          JSON.stringify({ event: "COMMENT_UPDATED", data: { ...data } })
        );
        return res.status(STATUS_CODES.OK).json(data);
      } else {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'Something went wrong' });
      }
    } catch (error) {
      throw error;
    }
  });

  app.delete('/api/comments/:commentId/deleteComment',CommentsAuth, async (req,res) => {
    try {
      console.log(req.user);
      const commentId = req.params.commentId;
      console.log(commentId);
      const deletedComment = await commentsController.deletedComment({ commentId });
      if(deletedComment){
        return res.status(STATUS_CODES.OK).json({ deletedComment });
      }else{
        return res.status(STATUS_CODES.BAD_REQUEST).json({error: "Something went wrong"});
      }
    } catch (error) {
      return error.message;
    }
  })
};
