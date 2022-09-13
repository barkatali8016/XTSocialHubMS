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

  /*****
   * for creating applaud details in db
   * @body postId applaudKey
   * @URL localhost:80/applaud
   */
  app.post('/create', async (req, res, next) => {
    // #swagger.tags = ['Applauds']
    // #swagger.description = 'To save applaud details'

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

  /*****
   * for updating applaud details in db based on applaudId
   * @body applaudId, applaudKey
   * @URL localhost:80/applaud
   */
  app.put('/update', async (req, res, next) => {
    // #swagger.tags = ['Applauds']
    // #swagger.description = 'To update applaud details'
    try {
      const { applaudId, applaudKey } = req.body;
      const userId = req.user._id;

      if (!EMOJI_LIST.includes(applaudKey)) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: 'Invalid Applaud Key' });
      }

      const { data } = await applaudController.updateApplaud({
        applaudId,
        applaudKey,
        userId,
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

  /*****
   * for deleting applaud details based on applaud id
   * @params id
   * @URL localhost:80/applauds/1234
   */

  app.delete('/delete/:id', async (req, res, next) => {
    // #swagger.tags = ['Applauds']
    // #swagger.description = 'To delete applaud details'
    try {
      const userId = req.user._id;

      const { data } = await applaudController.deleteApplaud(
        req.params.id,
        userId
      );
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

  /*****
   * for fetching applaud details based on postId
   * @params postId
   * @URL localhost:80/applaud/1234
   */
  app.get('/fetch/:postId', async (req, res, next) => {
    // #swagger.tags = ['Applauds']
    // #swagger.description = 'To fetch applaud details'
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
