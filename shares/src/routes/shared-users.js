var express = require('express');
var router = express.Router();
const { STATUS_CODES } = require("../utils/app-errors");
const { SharePostModel } = require('../database/models');

/* Get Users who have shared the post by postId. */
router.get('/post/:postId/share/users', async (req, res) => {
  try {
    const postId = req.params.postId.toString();
    const getUserDetails = await SharePostModel.findOne({ postId });
    if (getUserDetails) {
      return res.status(STATUS_CODES.OK).json({ userDetails: getUserDetails.shareDetails });
    } else {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: "Post does not exist." });
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

module.exports = router;