var express = require("express");
var router = express.Router();
const { STATUS_CODES } = require("../utils/app-errors");
const { SharePostModel } = require("../database/models");

/*****
 * Get Share Count By PostId.
 * @params postId
 * @URL localhost:80/shares/123/shareCount
 */
router.get("/:postId/shareCount", async (req, res) => {
  try {
    const postId = req.params.postId.toString();
    const getShareDetails = await SharePostModel.findOne({ postId });
    if (getShareDetails) {
      return res
        .status(STATUS_CODES.OK)
        .json({ shareCount: getShareDetails.shareCount });
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
