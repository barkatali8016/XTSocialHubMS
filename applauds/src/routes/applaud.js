const { ApplaudController } = require('../controllers');
const {
  validateSignUpBody,
  validateSignInBody,
} = require('../utils/validators');
const { STATUS_CODES } = require('../utils/app-errors');
const { EMOJI_LIST } = require('../config');

module.exports = async (app) => {
  const applaudController = new ApplaudController();

  app.post('/api/applaud', async (req, res, next) => {
    try {
      console.log(req.body);
      const { postId, applaudId } = req.body;
      if (!EMOJI_LIST.includes(applaudId)) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'Invalid Applaud Type' });
      }
      const userId = req.user._id;
      console.log(postId, userId, applaudId);
      const { data } = await applaudController.applaud({
        postId,
        userId,
        applaudId,
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

  app.delete('/api/applaud/:id', async (req, res, next) => {
    try {
      const { data } = await applaudController.deleteApplaud(req.params.id);
      if (data) {
        return res.status(STATUS_CODES.APPLAUD_DELETED).json(data);
      } else {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ error: 'Applaud not found' });
      }
    } catch (error) {
      next(error);
    }
  });
};
