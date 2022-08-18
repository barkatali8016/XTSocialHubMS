const { CommentsController } = require("../controllers");
const CommentsAuth = require("./middlewares/auth");
const { STATUS_CODES } = require("../utils/app-errors");
const { randomBytes } = require("crypto");

module.exports = async (app) => {
  const commentsController = new CommentsController();
  // ADD COMMENT
  app.post('/api/posts/:postId/comments',CommentsAuth, async (req, res, next) => {
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

  app.get('/api/posts/:postId/comments',CommentsAuth, async (req, res, next) => {
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
};
