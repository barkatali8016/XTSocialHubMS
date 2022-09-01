var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();
const { STATUS_CODES } = require('../utils/app-errors');
const { SharePostController } = require('../controllers');
const sharePostController = new SharePostController();
const { PublishMessage } = require('../utils');
const { XTSOCIAL_BINDING_KEY } = require('../config');

/* Share a post. */
router.put('/post/:postId/share', jsonParser, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const { data } = await sharePostController.share({
      postId,
      userId,
    });
    if (data) {
      PublishMessage(
        req.channel,
        XTSOCIAL_BINDING_KEY,
        JSON.stringify({ event: "POST_SHARED", data })
      );
      return res.status(STATUS_CODES.OK).json({ SUCCESS: "Post shared successfully." });
    } else {
      return res
        .status(STATUS_CODES.INTERNAL_ERROR)
        .json({ error: "Something went wrong." });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
