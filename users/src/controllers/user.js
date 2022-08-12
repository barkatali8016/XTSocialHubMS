const { UserRepository } = require("../database");

const { sendOTPMail, verifyOTPMail } = require("../utils");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  APIError,
  BadRequestError,
} = require("../utils");

class UserController {
  constructor() {
    this.repository = new UserRepository();
  }
  async SignUp(userInputs) {
    const { firstname, lastname, email, password, phone } = userInputs;

    try {
      // create salt
      let salt = await GenerateSalt();

      let userPassword = await GeneratePassword(password, salt);

      const createdUser = await this.repository.CreateUser({
        firstname,
        lastname,
        email,
        password: userPassword,
        phone,
        salt,
      });
      if (!createdUser) {
        return {};
      }

      return FormateData({ id: createdUser._id });
    } catch (error) {
      throw new APIError("Data Not found", error);
    }
  }
  async SignIn({ email, password }) {
    try {
      const existingUser = await this.repository.FindUser({ email });
      if (existingUser) {
        const validPassword = await ValidatePassword(
          password,
          existingUser.password,
          existingUser.salt
        );
        if (validPassword) {
          const tempToken = await GenerateSignature(
            {
              _id: existingUser._id,
            },
            "15m"
          );
          const stateId = await sendOTPMail(existingUser.email);
          if (stateId && stateId.state_id) {
            return FormateData({
              tempToken,
              stateId: stateId.state_id,
            });
          }
        }
      }
      return {};
    } catch (error) {
      throw error;
    }
  }
  async verifyOtp({ otp, stateId, _id }) {
    try {
      const validOtp = await verifyOTPMail(otp, stateId);
      console.log(validOtp, "ABC");
      if (
        validOtp.code == 913 ||
        validOtp.code == 915 ||
        !validOtp.authenticated
      ) {
        return FormateData({ ...validOtp });
      }
      const existingUser = await this.repository.FindUserById({ _id });
      console.log(existingUser);
      if (existingUser) {
        const token = await GenerateSignature({
          _id: existingUser._id,
        });
        return FormateData({
          token,
          email: existingUser.email,
          firstname: existingUser.firstname,
          lastname: existingUser.lastname,
          _id,
        });
      }
      return {};
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserController;
