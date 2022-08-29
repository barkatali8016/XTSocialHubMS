const { CommentsController } = require("../controllers");
const CommentsAuth = require("./middlewares/auth");
const { STATUS_CODES } = require("../utils/app-errors");
const { randomBytes } = require("crypto");
const { PublishMessage } = require("../utils");
const { XTSOCIAL_BINDING_KEY } = require("../config");

module.exports = async (app, channel) => {
  const commentsController = new CommentsController();
  // ADD COMMENT
  app.post(
    "/api/comments/:postId/addComment",
    CommentsAuth,
    async (req, res, next) => {
      try {
        const postId = req.params.postId;
        const { commentText } = req.body;
        const userId = req.user._id;

        const { data } = await commentsController.comment({
          postId,
          commentText,
          userId,
        });
        if (data) {
          PublishMessage(
            channel,
            XTSOCIAL_BINDING_KEY,
            JSON.stringify({ event: "COMMENT_CREATED", data })
          );
          return res.status(STATUS_CODES.COMMENT_CREATED).json(data);
        } else {
          return res
            .status(STATUS_CODES.BAD_REQUEST)
            .json({ error: "Something went wrong" });
        }
      } catch (error) {
        throw error;
      }
    }
  );

  app.get(
    "/api/comments/:postId/getComments",
    CommentsAuth,
    async (req, res, next) => {
      try {
        const postId = req.params.postId;

        const { data } = await commentsController.getComments({
          postId,
        });
        if (data) {
          return res.status(STATUS_CODES.OK).json(data);
        } else {
          return res
            .status(STATUS_CODES.BAD_REQUEST)
            .json({ error: "Something went wrong" });
        }
      } catch (error) {
        throw error;
      }
    }
  );

  app.put(
    "/api/comments/:commentId/editComment",
    CommentsAuth,
    async (req, res, next) => {
      try {
        const commentId = req.params.commentId;
        const { commentText } = req.body;

        const { data } = await commentsController.editComment(
          commentId,
          commentText
        );
        if (data) {
          PublishMessage(
            channel,
            XTSOCIAL_BINDING_KEY,
            JSON.stringify({ event: "COMMENT_UPDATED", data })
          );
          return res.status(STATUS_CODES.OK).json(data);
        } else {
          return res
            .status(STATUS_CODES.BAD_REQUEST)
            .json({ error: "Something went wrong" });
        }
      } catch (error) {
        throw error;
      }
    }
  );

  app.delete(
    "/api/comments/:commentId/deleteComment",
    CommentsAuth,
    async (req, res) => {
      try {
        const commentId = req.params.commentId;
        const deletedComment = await commentsController.deletedComment({
          commentId,
        });
        if (deletedComment) {
          return res.status(STATUS_CODES.OK).json({ deletedComment });
        } else {
          return res
            .status(STATUS_CODES.BAD_REQUEST)
            .json({ error: "Something went wrong" });
        }
      } catch (error) {
        return error.message;
      }
    }
  );
};
