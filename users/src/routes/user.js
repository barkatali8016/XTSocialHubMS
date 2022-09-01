const { UserController } = require("../controllers");
const {
  validateSignUpBody,
  validateSignInBody,
  validateVerifyOtpBody,
} = require("../utils/validators");
const UserAuth = require("./middlewares/auth");
const { STATUS_CODES } = require("../utils/app-errors");
const { PublishMessage } = require("../utils");
const { XTSOCIAL_BINDING_KEY } = require("../config");
module.exports = async (app, channel) => {
  const userController = new UserController();
  //SIGN UP ROUTES
  app.post("/signup", async (req, res, next) => {
    try {
      const validate = validateSignUpBody(req.body);
      if (validate.error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          error: validate.error.details[0].message,
        });
      }
      // const { firstname, lastname, email, password, phone,careerState,address } = req.body;

      const { data } = await userController.SignUp(req.body);
      if (data) {
        PublishMessage(
          channel,
          XTSOCIAL_BINDING_KEY,
          JSON.stringify({ event: "USER_CREATED", data: { ...data } })
        );
        return res.status(STATUS_CODES.USER_CREATED).json(data);
      } else {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: "Email already exist." });
      }
    } catch (error) {
      // next(error);
      throw error;
    }
  });

  //SIGN in ROUTES
  app.post("/signin", async (req, res, next) => {
    try {
      const validate = validateSignInBody(req.body);
      if (validate.error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          error: validate.error.details[0].message,
        });
      }
      const { email, password } = req.body;
      const { data } = await userController.SignIn({
        email,
        password,
      });
      if (data) {
        return res.status(STATUS_CODES.OK).json(data);
      } else {
        return res
          .status(STATUS_CODES.INTERNAL_ERROR)
          .json({ error: "Something went wrong." });
      }
    } catch (error) {
      next(error);
    }
  });

  //verifyOtp ROUTES
  app.post("/verifyOtp", UserAuth, async (req, res, next) => {
    try {
      const validate = validateVerifyOtpBody(req.body);
      if (validate.error) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          error: validate.error.details[0].message,
        });
      }
      const { _id } = req.user;

      const { otp, stateId } = req.body;
      const { data } = await userController.verifyOtp({
        otp,
        stateId,
        _id,
      });
      if (data) {
        return res.status(STATUS_CODES.OK).json(data);
      } else {
        return res
          .status(STATUS_CODES.INTERNAL_ERROR)
          .json({ error: "Something went wrong." });
      }
    } catch (error) {
      next(error);
    }
  });
};
