const { ApplaudRepository } = require('../database');
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  APIError,
  BadRequestError,
} = require('../utils');

class ApplaudController {
  constructor() {
    this.repository = new ApplaudRepository();
  }
  async applaud(applaudData) {
    const { postId, userId } = applaudData;

    try {
      // create salt
      let salt = await GenerateSalt();

      const createdApplaud = await this.repository.createApplaud({
        postId,
        userId,
        salt,
      });
      if (!createdApplaud) {
        return {};
      }
      console.log(createdApplaud);
      return FormateData({ id: createdApplaud._id });
    } catch (error) {
      throw new APIError('Data Not found', error);
    }
  }
  // async SignIn({ email, password }) {
  //   try {
  //     const existingUser = await this.repository.FindUser({ email });
  //     if (existingUser) {
  //       const validPassword = await ValidatePassword(
  //         password,
  //         existingUser.password,
  //         existingUser.salt
  //       );
  //       if (validPassword) {
  //         const token = await GenerateSignature({
  //           email: email,
  //           _id: existingUser._id,
  //         });
  //         return FormateData({
  //           id: existingUser._id,
  //           firstname: existingUser.firstname,
  //           lastname: existingUser.lastname,
  //           email: existingUser.email,
  //           token,
  //         });
  //       }
  //     }
  //     return {};
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
module.exports = ApplaudController;
