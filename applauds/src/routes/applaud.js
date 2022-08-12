const { ApplaudController } = require('../controllers');
const {
  validateSignUpBody,
  validateSignInBody,
} = require('../utils/validators');
const { STATUS_CODES } = require('../utils/app-errors');
module.exports = async (app) => {
  const applaudController = new ApplaudController();

  app.post('/api/post/:postId', async (req, res, next) => {
    try {
      const postId = req.params.postId;

      const userId = req.params.postId; // need to change once token is passed
      console.log(postId, userId);
      const { data } = await applaudController.applaud({
        postId,
        userId,
      });
      if (data) {
        return res.status(STATUS_CODES.USER_CREATED).json(data);
      } else {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'Email already exist.' });
      }
    } catch (error) {
      next(error);
    }
  });
};
