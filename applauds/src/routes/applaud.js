const { ApplaudController } = require('../controllers');
const {
  validateSignUpBody,
  validateSignInBody,
} = require('../utils/validators');
const { STATUS_CODES } = require('../utils/app-errors');
const { EMOJI_LIST, XTSOCIAL_BINDING_KEY } = require('../config');
const { PublishMessage } = require('../utils');

module.exports = async (app, channel) => {
  const applaudController = new ApplaudController();

  //for creating applaud details in db
  app.post('/api/applaud', async (req, res, next) => {
    try {
      const { postId, applaudKey } = req.body;
      if (!EMOJI_LIST.includes(applaudKey)) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'Invalid Applaud Key' });
      }
      const userId = req.user._id;

      const { data } = await applaudController.applaud({
        postId,
        userId,
        applaudKey,
      });

      if (data) {
        PublishMessage(
          channel,
          XTSOCIAL_BINDING_KEY,
          JSON.stringify({ event: 'APPLAUD_CREATED', data })
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

  //for creating applaud details in db based on applaudId
  app.put('/api/applaud', async (req, res, next) => {
    try {
      const { applaudId, applaudKey } = req.body;
      if (!EMOJI_LIST.includes(applaudKey)) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'Invalid Applaud Key' });
      }

      const { data } = await applaudController.updateApplaud({
        applaudId,
        applaudKey,
      });

      if (data) {
        PublishMessage(
          channel,
          XTSOCIAL_BINDING_KEY,
          JSON.stringify({ event: 'APPLAUD_UPDATED', data })
        );
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

  //for deleting applaud details based on applaud id
  app.delete('/api/applaud/:id', async (req, res, next) => {
    try {
      const { data } = await applaudController.deleteApplaud(req.params.id);
      if (data) {
        PublishMessage(
          channel,
          XTSOCIAL_BINDING_KEY,
          JSON.stringify({ event: 'APPLAUD_DELETED', data })
        );
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

  //for fetching applaud details based on postId
  app.get('/api/applaud/:postId', async (req, res, next) => {
    try {
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
