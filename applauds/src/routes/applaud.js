const { ApplaudController } = require('../controllers');
const {
  validateSignUpBody,
  validateSignInBody,
} = require('../utils/validators');
const { STATUS_CODES } = require('../utils/app-errors');
module.exports = async (app) => {
  const applaudController = new ApplaudController();

  app.post('/api/post', async (req, res, next) => {
    try {
      console.log(req.body);
      const { postId, applaud } = req.body;
      const userId = req.body.postId; // need to change req.get("Authorization") once token is passed
      console.log(postId, userId, applaud);
      const { data } = await applaudController.applaud({
        postId,
        userId,
        applaud,
      });
      if (data) {
        return res.status(STATUS_CODES.APPLAUD_CREATED).json(data);
      } else {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'Applaud already exist.' });
      }
    } catch (error) {
      next(error);
    }
  });
};
