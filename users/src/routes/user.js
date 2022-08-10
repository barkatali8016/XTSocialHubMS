const { UserController } = require("../controllers");
const {
  validateSignUpBody,
  validateSignInBody,
} = require("../utils/validators");
const { STATUS_CODES } = require("../utils/app-errors");
module.exports = async (app) => {
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
      const { firstname, lastname, email, password, phone } = req.body;

      const { data } = await userController.SignUp({
        firstname,
        lastname,
        email,
        password,
        phone,
      });
      if (data) {
        return res.status(STATUS_CODES.USER_CREATED).json(data);
      } else {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ error: "Email already exist." });
      }
    } catch (error) {
      next(error);
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
};
