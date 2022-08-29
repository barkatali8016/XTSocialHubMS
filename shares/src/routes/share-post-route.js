var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();
const { STATUS_CODES } = require('../utils/app-errors');
const { validateSharePostBody } = require('../utils/validators');
const { SharePostController } = require('../controllers');
const sharePostController = new SharePostController();
const { PublishMessage } = require('../utils');
const { POST_BINDING_KEY } = require('../config');
const { SharePostModel } = require('../database/models');

/* Share a post. */
router.put('/post/:postId/share', jsonParser, async (req, res, next) => {
  try {
    const validate = validateSharePostBody(req.body);
    const postId = req.params.postId;
    if (validate.error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        error: validate.error.details[0].message,
      });
    }
    const { userId } = req.body;
    const { data } = await sharePostController.share({
      postId,
      userId,
    });
    if (data) {
    const shareDetails = await SharePostModel.findOne({ postId });
      PublishMessage(
        req.channel,
        POST_BINDING_KEY,
        JSON.stringify({ event: "POST_SHARED", data: { ...data, postId, shareCount: shareDetails.shareCount } })
      );
      return res.status(STATUS_CODES.OK).json("Post shared successfully.");
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
