const { QueryController } = require("../controllers");
const {
  validateSignUpBody,
  validateSignInBody,
  validateVerifyOtpBody,
} = require("../utils/validators");
const UserAuth = require("./middlewares/auth");
const { STATUS_CODES } = require("../utils/app-errors");
const { SubscribeMessage } = require("../utils");
module.exports = async (app, channel) => {
  const queryController = new QueryController();
  await SubscribeMessage(channel, queryController);

  /*****
   * FETCH ALL POST
   *
   */
  app.get("/all-posts", async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const data = await queryController.getAllPosts({ page, limit });
      if (data) {
        return res.status(STATUS_CODES.USER_CREATED).json(data);
      } else {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: "Something went wrong." });
      }
    } catch (error) {
      next(error);
    }
  });
  /*****
   * FETCH ALL POST BY CURRENT USER ID
   *
   */
  app.get("/posts/current-user", UserAuth, async (req, res, next) => {
    const userId = req.user._id;
    try {
      const { page = 1, limit = 10 } = req.query;
      const data = await queryController.getAllPostsByUserId({
        userId,
        page,
        limit,
      });
      if (data) {
        return res.status(STATUS_CODES.USER_CREATED).json(data);
      } else {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: "Something went wrong." });
      }
    } catch (error) {
      next(error);
    }
  });

  /*****
   * FETCH ALL POST BY USER ID
   * @params userId
   */
  app.get("/posts/:userId", async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const data = await queryController.getAllPostsByUserId({
        userId,
        page,
        limit,
      });
      if (data) {
        return res.status(STATUS_CODES.USER_CREATED).json(data);
      } else {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: "Something went wrong." });
      }
    } catch (error) {
      next(error);
    }
  });
};
