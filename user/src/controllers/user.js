const { UserRepository } = require("../database");
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
          const token = await GenerateSignature({
            email: email,
            _id: existingUser._id,
          });
          return FormateData({
            id: existingUser._id,
            firstname: existingUser.firstname,
            lastname: existingUser.lastname,
            email: existingUser.email,
            token,
          });
        }
      }
      return {};
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserController;
