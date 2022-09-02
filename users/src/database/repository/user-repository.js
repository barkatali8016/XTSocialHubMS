const { UserModel } = require("../models");

//Dealing with data base operations
class UserRepository {
  async CreateUser(userInputs) {
    try {
      const isEmailExist = await UserModel.findOne({ email: userInputs.email });
      if (isEmailExist) {
        return null;
      }
      const user = new UserModel(userInputs);
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      throw err;
    }
  }

  async FindUser({ email }) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async FindUserById({ _id }) {
    try {
      const user = await UserModel.findOne({ _id });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
