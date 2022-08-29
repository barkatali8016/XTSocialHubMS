const { ApplaudController } = require('../controllers');
const {
  validateSignUpBody,
  validateSignInBody,
} = require('../utils/validators');
const { STATUS_CODES } = require('../utils/app-errors');
const { EMOJI_LIST, APPLAUD_BINDING_KEY } = require('../config');
const { PublishMessage } = require('../utils');

module.exports = async (app, channel) => {
  const applaudController = new ApplaudController();

  app.post('/api/applaud', async (req, res, next) => {
    try {
      console.log(req.body);
      const { postId, applaudKey } = req.body;
      if (!EMOJI_LIST.includes(applaudKey)) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'Invalid Applaud Key' });
      }
      const userId = req.user._id;

      console.log(postId, userId, applaudKey);
      const { data } = await applaudController.applaud({
        postId,
        userId,
        applaudKey,
      });
      if (data) {
        PublishMessage(
          channel,
          APPLAUD_BINDING_KEY,
          JSON.stringify({ event: 'APPLAUD_ADDED', data: { ...data } })
        );
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

  app.put('/api/applaud', async (req, res, next) => {
    try {
      console.log(req.body);
      const { applaudId, applaudKey } = req.body;
      if (!EMOJI_LIST.includes(applaudKey)) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'Invalid Applaud Key' });
      }
      const userId = req.user._id;

      console.log(userId, applaudId, applaudKey);
      const { data } = await applaudController.updateApplaud({
        applaudId,
        userId,
        applaudKey,
      });

      if (data) {
        return res.status(STATUS_CODES.APPLAUD_UPDATED).json(data);
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
  app.get('/api/applaud/:postId', async (req, res, next) => {
    try {
      console.log(req.params.postId);
      const data = await applaudController.getApplaud(req.params.postId);
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
