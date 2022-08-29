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
  //SIGN UP ROUTES
  app.get("/fetch/posts", async (req, res, next) => {
    try {
      const data = await queryController.getAllPosts();
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
